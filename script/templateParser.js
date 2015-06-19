/**
 * Created by kosiak_man on 16.05.15.
 */
var templateParser = function(parentElement){
    var buttonText = "Ответить",
        defOptions = {
            text: "",
            answers: [],
            answerIds: []
        },
        i,
        header,
        footer,
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
                class: "button",
                value: buttonText
            });
        },
        createElements = function(){
            !header && createQuestionCont();
            !footer && createFooterCont();
        };

    return {
        setOptions: function(newState){

        },
        getOptions: function(){},
        getState: function(){}
    }
}