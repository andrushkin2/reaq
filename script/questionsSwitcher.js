/**
 * Created by kosiak_man on 26.06.15.
 */
valera.require([
    ["./script/templateParser.js", "valera.extends.templateParser"]
], function(){
    "use strict";

    valera.extends.questionsSwitcher = function(parentContainer, insertBefore){
        var container,
            createContainer = function(){
                var elem = valera.createElement("div", {
                    class: "test_cases"
                }, null, !insertBefore? parentContainer : null);
                insertBefore && parentContainer.insertBefore(elem, insertBefore);
                return elem;
            },
            createTestCont = function(){
                return valera.createElement("div", {
                    class: "test_case"
                }, null, container);
            },
            destroy = function(){
                (containers || []).map(function(obj){
                    obj.container && container.removeChild(obj.container);
                    obj.parser && obj.parser.destroy();
                });
                containers = [];
                container && parentContainer.removeChild(container);
                activeIndex = 0;
                container = null;
            },
            tempParser = valera.extends.templateParser,
            activeIndex = 0,
            containers = [],
            createContainers = function(){
                [0, 1].map(function(){
                    var elem = createTestCont();
                    containers.push({
                        container: elem,
                        parser: tempParser(elem)
                    });
                });
            },
            createElemets = function(){
                container = container || createContainer();
                !containers.length && createContainers();
            };
        createElemets();

        return {
            setState: function(newState){
                var oldActiveCont,
                    newActiveCont;
                createElemets();
                oldActiveCont = containers[activeIndex];
                activeIndex = activeIndex ? 0 : 1;
                newActiveCont = containers[activeIndex];
                newActiveCont.parser.setState(newState);
                valera.removeClass(oldActiveCont.container, "active");
                valera.addClass(newActiveCont.container, "active");
            },
            getState: function(){
                return containers[activeIndex].parser.getState();
            },
            destroy: destroy
        };
    };
});