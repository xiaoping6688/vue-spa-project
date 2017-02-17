var util = require('./util.js');

function rule(id, include, exclude){
    var shouldInclude = include ? util.getFilter(include) : function(){return true},
        shouldExclude = exclude ? util.getFilter(exclude) : function(){return false};

    return {
        id: id,
        match: function (item){
            if(shouldExclude(item)) return false;
            else return shouldInclude(item);
        },
        apply: function(act){

        }
    }
}
function ruleSet(ruleArr, ignore){
    ruleArr = ruleArr instanceof Array ? ruleArr : [ruleArr];
    var rules = ruleArr.map(function(one, i){
        return rule(i, one.from, one.exclude);
    });
    function getMatchedRule(item, filter){
        var match = null;
        filter = filter || function(){return true};
        rules.forEach(function(one, index){
            if(filter(one) && one.match(item)) match = one;
        });
        return match ? ruleArr[match.id] : null;
    }
    return {
        getMatchedRule: getMatchedRule,
        shouldIgnore: ignore ? util.getFilter(ignore) : function(){return false},
        getRule: function(id){
            return rules[id];
        }
    }
}

module.exports = {
    ruleSet: ruleSet
};