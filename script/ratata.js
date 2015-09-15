/* global valera */
/**
 * Created by kosiak_man on 19.06.15.
 */
valera.require([
    ["./script/dataCenter.js", "valera.extends.dataCenter"],
    ["./script/templateParser.js", "valera.extends.templateParser"],
    ["./script/testButton.js", "valera.extends.testButton"],
    ["./script/report.js", "valera.extends.report"],
    ["./script/dataSpliter.js", "valera.extends.dataSpliter"]
], function(){
    "use strict";

    valera.extends.initialize = function(){
        var startButton = document.querySelector(".central_button"),
            middleCont = document.querySelector(".middle_cont"),
            centralText = document.querySelector(".central_text"),
            testsCont = document.querySelector(".tests_cont"),
            testManager,
            report = valera.extends.report(testsCont),
            startTest = function(isStart){
                var add = "addClass",
                    del = "removeClass";
                valera[!isStart? add : del](middleCont, "test");
                valera[!isStart? add : del](document.body, "inActive");
                valera[!isStart? del : add](startButton, "active");
                valera[!isStart? add : del](testsCont, "show");
                if (report){
                    report.reset();
                    report.hide();
                }
            },
            showMainLogo = function(){
                valera.addClass(middleCont, "active");
                valera.addClass(centralText, "active");
                valera.addClass(startButton, "active");
                startTest(true);
            },
            callback = function(data){
                testManager && testManager.destroy();
                debugger;
                if(report){
                    report.show();
                    report.setOptions(data);
                }
            };
        valera.attachEvent("showMainLogo", showMainLogo);
        valera.attachEvent("startTest", function(){
            startTest(false);

            var dataCenter = valera.extends.dataCenter();
            dataCenter("./data/file.xlsx", function(data){
                testManager = valera.extends.testButton(testsCont);
                testManager.start(valera.extends.dataSpliter(data, 25), callback);
            }, function(e){
                debugger;
            });
        });

        startButton.addEventListener("click", function(){
            valera.fireEvent("startTest");
        }, false);

        valera.fireEvent("showMainLogo", false);
    };
});