/**
 * Created by kosiak_man on 26.06.15.
 */
valera.require([
    ["./script/questionsSwitcher.js", "valera.extends.questionsSwitcher"]
], function(){
    "use strict";

    valera.extends.testButton = function(parent, insertBefore){
        var footer, buttonOk, switcher, timer,
            buttonText = "Ответить",
            lastTime = document.querySelector(".lastTime"),
            lastTimeCont = document.querySelector(".lastTimeCont"),
            createFooterCont = function(){
                footer = valera.createElement("footer", {}, {}, !insertBefore? parent : null);
                insertBefore && parent.insertBefore(footer, insertBefore);
            },
            createButton = function(){
                var div = valera.createElement("div", {
                    class: "buttonParent"
                }, null, footer),
                    text;
                text = valera.createElement("button", {
                    class: "button"
                }, null, div);
                timer = valera.createElement("button", {
                    class: "button timer"
                }, null, div);
                buttonOk = valera.createElement("button", {
                    class: "button text"
                }, {
                    innerHTML: buttonText
                }, div);
            },
            createElements = function(){
                !footer && createFooterCont();
                if (!buttonOk){
                    createButton();
                    buttonOk.addEventListener("click", clickEvent, false);
                }
                switcher = switcher || valera.extends.questionsSwitcher(parent, footer);
            },
            timerToNext,
            secondsToNext,
            clickEvent = function(e){
                e && e.preventDefault();
                valera.removeClass(timer, "active");
                index++;
                index - 1 > -1 && answers.push(switcher.getState());
                secondsToNext = 90;
                timerToNext && clearInterval(timerToNext);
                if (switcher && data[index]){
                    switcher.setState(data[index]);
                    timerToNext = setInterval(function(){
                        secondsToNext--;
                        if(secondsToNext){
                            valera.addClass(timer, "active");
                            lastTime.innerHTML = secondsToNext;
                        } else {
                            clickEvent();
                        }
                    }, 1000);
                } else {
                    callbackFunc && callbackFunc(answers);
                }
            },
            destroy = function(){
                data = [];
                answers = [];
                callbackFunc = null;
                index = -1;
                if (buttonOk && buttonOk.parentNode){
                    buttonOk.removeEventListener("click", clickEvent, false);
                    footer && footer.removeChild(buttonOk.parentNode);
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
        };
    };
});
