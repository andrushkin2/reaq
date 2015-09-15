/**
 * Created by kosiak_man on 11.08.15.
 */
valera.require([], function() {
    "use strict";

    valera.extends.report = function(parent){
        var createElement = valera.createElement,
            statesProp = "states",
            questionAmount = 0,
            rightQuestionsAmount = 0,
            mainCont = createElement("div", {
                class: "reportContainer"
            }, null, parent),
            cleanContainer = function(elem){
                var element = elem || mainCont,
                    child;
                while(child = element.firstChild){
                    element.removeChild(child);
                }
            },
            reset = function(){
                cleanContainer();
                questionAmount = 0;
                rightQuestionsAmount = 0;
            },
            createHeader = function(text, appendTo){
                return createElement("div", {
                    class: "header"
                }, {
                    innerHTML: text || ""
                }, appendTo);
            },
            createAnswerBlock = function(appendTo){
                return createElement("div", {
                    class: "answers"
                }, null, appendTo);
            },
            answerContainer = function(questionText, isTrue, userAnswer, appendTo){
                var questCont = valera.createElement("div", {
                        class: "answer" + (isTrue !== userAnswer? " wrong" : "")
                    }, null, appendTo),
                    id = valera.createId(),
                    label = valera.createElement("div", {
                        class: "answerText",
                        for: id
                    }, null, questCont);
                createElement("span", {
                    class: "check" + (userAnswer? " active" : ""),
                    title: "Ответ юзера"
                }, {
                    innerHTML: "<span class=\"circle\">&nbsp;</span>"
                }, label);
                createElement("span", {
                    class: "check labelCheck" + (isTrue? " active" : ""),
                    title: "Ожидаемый ответ"
                }, {
                    innerHTML: "<span class=\"circle\">&nbsp;</span>"
                }, label);
                createElement("span", {
                    class: "text"
                }, {
                    innerHTML: questionText
                }, label);
                return questCont;
            },
            compareStates = function(a, b){
                var len = a.length,
                    i;
                valera.asset(len === b.length, "Answers arrays should be have equal length");
                for (i = 0; i < len; i++){
                    if (a[i] !== b[i]){
                        return false;
                    }
                }
                return true;
            },
            createResultBlock = function(option){
                var block = createElement("div", {
                        class: "reportBlock"
                    }, null, mainCont),
                    questions,
                    i, len = option.answers.length;
                createHeader(option.question, block);
                if (!compareStates(option[statesProp], option.trueFalseIndexes)){
                    questions = createAnswerBlock(block);
                    for (i = 0; i < len; i++){
                        answerContainer(option.answers[i], option.trueFalseIndexes[i], option[statesProp][i], questions);
                    }
                } else {
                    valera.addClass(block, "rightBlock");
                    rightQuestionsAmount++;
                }
            },
            setOptions = function(results){
                valera.asset(results.hasOwnProperty("length"), "Results should be an array");
                var i,
                    resultsBlock,
                    len = results.length;
                reset();
                resultsBlock = createElement("div", {
                    class: "reportBlock rightBlock resultBlock"
                }, null, mainCont);
                questionAmount = len;
                for (i = 0; i < len; i++){
                    createResultBlock(results[i]);
                }
                createHeader("Правильных ответов {0} из {1}.<br/>Процент правильных ответов: {2}%".replace("{0}", rightQuestionsAmount).replace("{1}", questionAmount).replace("{2}", Math.round(rightQuestionsAmount/questionAmount*100)), resultsBlock);
            },
            showOrHide = function(isShow){
                mainCont.style.display = isShow? "block" : "none";
            };
        showOrHide(false);

        return {
            setOptions: setOptions,
            destroy: function(){
                reset();
                parent.removeChild(mainCont);
                mainCont = null;
            },
            reset: reset,
            show: function(){
                showOrHide(true);
            },
            hide: showOrHide
        };
    };
});