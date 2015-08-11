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
                if (!buttonOk){
                    createButton();
                    buttonOk.addEventListener("click", clickEvent, false);
                }
                switcher = switcher || valera.extends.questionsSwitcher(parent, footer);
            },
            clickEvent = function(e){
                e && e.preventDefault();
                index++;
                index - 1 > -1 && answers.push(switcher.getState());
                if (switcher && data[index]){
                    switcher.setState(data[index]);
                } else {
                    callbackFunc && callbackFunc(answers);
                }
                // todo: add logic for working with data step by step
            },
            destroy = function(){
                data = [];
                answers = [];
                callbackFunc = null;
                index = -1;
                if (buttonOk){
                    buttonOk.removeEventListener("click", clickEvent, false);
                    footer && footer.removeChild(buttonOk);
                }
                footer && parent && parent.removeChild(footer);
                switcher && switcher.destroy();
                footer = buttonOk = switcher = null;
            },
            answers = [],
            callbackFunc = null,
            data = [],
            index = -1;
        createElements();

        return {
            start: function(newState, callback){
                data = newState || [];
                createElements();
                clickEvent();
                callbackFunc = callback;
            },
            destroy: destroy
        }
    }
});
