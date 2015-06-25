/**
 * Created by kosiak_man on 16.05.15.
 */
valera.require([], function(){
    "use strict";

    valera.extends.templateParser = function(parentElement){
        var buttonText = "Ответить",
            statesProp = "states",
            options = {
                text: "",
                answers: [],
                trueFalseIndexes: []
            },
            i,
            header,
            footer,
            answers,
            answerArr = [],
            buttonOk,
            createQuestionCont = function(){
                header = valera.createElement("header", {}, {}, parentElement);
            },
            createFooterCont = function(){
                footer = valera.createElement("footer", {}, {}, parentElement);
                !buttonOk && createButton();
            },
            createButton = function(){
                buttonOk = valera.createElement("button", {
                    class: "button"
                }, {
                    innerHTML: buttonText
                }, footer);
            },
            createAnswersContainer = function(){
                answers = valera.createElement("div", {
                    class: "answers"
                }, null, parentElement);
            },
            answerContainer = function(questionText){
                var questCont = valera.createElement("div", {
                        class: "answer"
                    }, null, answers),
                    id = valera.createId(),
                    check = valera.createElement("input", {
                        class: "checkbox",
                        type: "checkbox",
                        id: id
                    }, null, questCont),
                    label = valera.createElement("label", {
                        class: "answerText",
                        for: id
                    }, null, questCont);
                valera.createElement("span", {
                    class: "check"
                }, {
                    innerHTML: "<span class=\"circle\">&nbsp;</span>"
                }, label);
                valera.createElement("span", {
                    class: "text"
                }, {
                    innerHTML: "<span class=\"text\">"+ questionText +"</span>"
                }, label);
                return check;
            },
            createAnswer = function(){
                var i,
                    answers = options.answers,
                    len = answers.length;
                answerArr = [];
                for (i = 0; i < len; i++){
                    answerArr.push(answerContainer(answers[i]));
                }
            },
            createElements = function(){
                !header && createQuestionCont();
                !answers && createAnswersContainer();
                !footer && createFooterCont();
            };

        return {
            setState: function(newState){
                options = valera.extend(true, {}, options, newState);
                createElements();
                header.innerText = options.question;
                createAnswer();

            },
            getState: function(){}
        }
    }
});