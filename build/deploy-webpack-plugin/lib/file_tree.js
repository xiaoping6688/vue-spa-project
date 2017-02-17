var fs = require('fs-extra'),
    path = require('path'),
    async = require('async'),
    util = require('./util.js');

function Node(rootPath, relPath, parent){
    this.rootPath = rootPath || process.cwd();
    if(!path.isAbsolute(this.rootPath)) throw new Error('An absolute root path is required.');
    this.parent = parent || null;
    this.children = {};
    this.relPath = relPath;
    this.absPath = path.resolve(rootPath, relPath);
    this.isDir = fs.lstatSync(this.absPath).isDirectory();
    this.ownRule = null;
    // @TODO hasRule是递归的话,就没有必要存储inheritedRules了,两者取其一
    this.inheritedRules = this.parent ? this.parent.getMatchedRules() : [];
    this.shouldActAsWhole = true;

}
Node.prototype.getMatchedRules = function(){
    return this.ownRule ? this.inheritedRules.concat({
        rule: this.ownRule,
        owner: this
    }) : this.inheritedRules
};
Node.prototype.takeApart = function(){
    this.shouldActAsWhole = false;
    this.parent && this.parent.takeApart();
};
Node.prototype.hasOwnRule = function(rule){
    return this.ownRule ? (this.ownRule.id === rule.id) : false;
};
Node.prototype.hasRule = function(rule){
    return this.hasOwnRule(rule) || (this.parent && this.parent.hasRule(rule));
};
Node.prototype.build = function(ruleset, cb){
    this.ownRule = ruleset.getMatchedRule(this.relPath, function(rule){
        return !this.hasRule(rule)
    }.bind(this));
    if(this.ownRule) this.parent && this.parent.takeApart();
    if(this.isDir)
        fs.readdir(this.absPath, function(err, children){
            if(err) return cb(err);
            // if has children, build children and recursively build descendant
            if(children.length) async.map(children, buildChild.bind(this), cb);
            // if has no child, just callback
            else cb(null);
        }.bind(this));
    else {
        cb(null);
    }

    function buildChild(childName, cb){
        var childPath = path.join(this.relPath, childName);
        if(ruleset.shouldIgnore(childPath)) return cb(null); // if ignored by ruleset, just skip it
        try {
            var child = new Node(this.rootPath, childPath, this);
        }catch(e){
            cb(e)
        }
        this.children[childName] = child;
        child.build(ruleset, cb);
    }
};

Node.prototype.getRuleMatches = function(result){
    result = result || {};
    if(this.ownRule && this.shouldActAsWhole)
    // if has own rule and not taken apart by self-ruled child
        result[this.relPath] = this.ownRule.id;
    else {
        // else should use the closest inherited rule if any
        var l = this.inheritedRules.length;
        if(l) result[this.relPath] = this.inheritedRules[l - 1].rule.id;
    }
    for(var key in this.children){
        this.children[key].getRuleMatches(result)
    }
    return result;
};

function Tree(rootPath){
    Node.call(this, rootPath, '', null);
}
util.inheritFrom(Tree, Node);

module.exports = {
    Tree: Tree
};