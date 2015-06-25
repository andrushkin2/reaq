/**
 * Created by kosiak_man on 23.06.15.
 */
valera.require([
    ["./script/fileParser.js", "valera.extends.fileParser"]
], function(){
    "use strict";
    valera.extends.dataCenter = function(){
        var questionField = "Вопрос",
            answerField = "Варианты ответов",
            isTrueField = "isTrue",
            load = valera.extends.fileParser(),
            getObject = function(){
                return {
                    question: "",
                    answers: [],
                    trueFalseIndexes: []
                };
            },
            parseData = function(arrayData){
                var result = [],
                    activeObject,
                    len, i, elem;
                arrayData = arrayData || [];
                len = arrayData.length;
                for (i = 0; i < len; i++){
                    elem = arrayData[i];
                    if (elem[questionField]){
                        activeObject && result.push(activeObject);
                        activeObject = getObject();
                        activeObject.question = elem[questionField];
                    }
                    if (elem[answerField] && activeObject){
                        activeObject.answers.push(elem[answerField]);
                        activeObject.trueFalseIndexes.push(!!elem[isTrueField]);
                    }
                }
                activeObject && result.push(activeObject);
                return result;
            };

        return function(pathToFile, success, fail){
            load.getData(pathToFile, function(data){
                success && success(parseData(data && data["0"] || []));
            }, function(error){
                fail && fail(error);
            });
        };
    }
});