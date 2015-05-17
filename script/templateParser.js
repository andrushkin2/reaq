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
            header = valera.createElemet("header", {}, {}, parentElement);
        },
        createFooterCont = function(){
            footer = valera.createElemet("footer", {}, {}, parentElement);
            !buttonOk && createButton();
        },
        createButton = function(){
            buttonOk = valera.createElemet("button", {
                class: "button",
                value: buttonText
            });
        },
        createElements = function(){
            !header && createQuestionCont();
            !footer && createFooterCont();
        };

    return {
        setOptions: function(newState){},
        getoptions: function(){},
        getState: function(){}
    }
}