/**
 * Created by kosiak_man on 26.06.15.
 */
valera.require([
    ["./script/questionsSwitcher.js", "valera.extends.questionsSwitcher"]
], function(){
    "use strict";

    valera.extends.testButton = function(parent, insertBefore){
        var footer, buttonOk, switcher,
            buttonText = "Ответить",
            createFooterCont = function(){
                footer = valera.createElement("footer", {}, {}, !insertBefore? parent : null);
                insertBefore && parent.insertBefore(footer, insertBefore);
            },
            createButton = function(){
                buttonOk = valera.createElement("button", {
                    class: "button"
                }, {
                    innerHTML: buttonText
                }, footer);
            },
            createElements = function(){
                !footer && createFooterCont();
                !buttonOk && createButton();
                switcher = switcher || valera.extends.questionsSwitcher(parent, footer);
            },
            clickEvent = function(e){
                e.preventDefault();
                // todo: add logic for working with data step by step
            };
        createElements();

        return {
            start: function(newState){
                switcher && switcher.setState(newState);
            },
            stop: function(){},
            destroy: function(){

            }
        }
    }
});
