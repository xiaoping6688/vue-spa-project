var path = require('path'),
    fs = require('fs'),
    async = require('async'),
    util = require('./lib/util.js'),
    fis_util = require('./lib/fis-util.js');

function DeployPlugin(options) {
    this.receiver = options.receiver || null;
    this.tplDir = options.tplDir;
    this.staticDir = options.staticDir;
    this.context = null;
    this.extractedFiles = [];
}
DeployPlugin.prototype.apply = function(complier){
    var that = this;
    this.context = complier.options.context;
    this.staticDir = path.resolve(this.context, this.staticDir);
    this.tplDir = path.resolve(this.context, this.tplDir);
    function deployLocal(asset, to, cb){
        util.writeFile(asset.source(), to, cb)
    }
    /* @param to :the final path of the asset */
    function deployRemote(asset, to, cb){
        fis_util.upload(that.receiver, null, {to: to}, (asset.source()), path.basename(to), cb);
    }
    function removeTempFile(asset, cb){
        if(!cb) cb = function(){};
        if(asset.existsAt) fs.unlink(asset.existsAt, function(err){
            if(err)console.warn(err.message, 'when removing cache file ', name);
            cb()
        });
        else cb()
    }
    complier.plugin('done', function(stats, done){
        var assets = stats.compilation.assets;
        async.eachOf(assets, function(asset, name, cb){
            if(!asset.emitted) return cb(); // on watching mode files unchanged is not emitted, skip it
            var deployDir = (['.js', '.css', '.jpg', '.jpeg', '.png', '.gif'].indexOf(path.extname(name))!=-1) ?
                that.staticDir : that.tplDir;
            var to = path.join(deployDir, name);
            if(path.extname(name) == '.css'){
                if(that.extractedFiles.indexOf(to) != -1) return removeTempFile(asset, cb);
                that.extractedFiles.push(to);
            }
            var deployFuc = that.receiver ? deployRemote : deployLocal;
            deployFuc(asset, to, function(err){
                if(err){
                    console.error(err.message, 'when deploying ', name, '  ---->  ', to);
                    cb(err);
                }else{
                    console.log( name, '  ---->  ', to);
                    removeTempFile(asset);
                    cb()
                }
            });
        }, done)
    })
};

module.exports = DeployPlugin;