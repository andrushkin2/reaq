/**
 * Created by kosiak_man on 19.06.15.
 */
valera.require([
    ["./script/dataCenter.js", "valera.extends.dataCenter"]
], function(){
    "use strict"
    valera.extends.initialize = function(){
        var startButton = document.querySelector(".central_button"),
            middleCont = document.querySelector(".middle_cont"),
            centralText = document.querySelector(".central_text"),
            testsCont = document.querySelector(".tests_cont"),
            startTest = function(isStart){
                var add = "addClass",
                    del = "removeClass";
                valera[!isStart? add : del](middleCont, "test");
                valera[!isStart? add : del](document.body, "inActive");
                valera[!isStart? del : add](startButton, "active");
                valera[!isStart? add : del](testsCont, "show");
            },
            showMainLogo = function(){
                valera.addClass(middleCont, "active");
                valera.addClass(centralText, "active");
                valera.addClass(startButton, "active");
                startTest(true);
            };
        valera.attachEvent("showMainLogo", showMainLogo);
        valera.attachEvent("startTest", function(){
            startTest(false);
        });

        startButton.addEventListener("click", function(){
            valera.fireEvent("startTest");
        }, false);

        valera.fireEvent("showMainLogo", false);

        var dataCenter = valera.extends.dataCenter();
        dataCenter("./data/file.xlsx", function(data){
            debugger;
        }, function(e){
            debugger;
        });
    };
});