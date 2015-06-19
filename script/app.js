(function (doc, win) {
    var createElement = function (node, attrs, methods, appendTo) {
            var elem = document.createElement(nodeName), opt;
            for (opt in attrs) {
                if (attrs.hasOwnProperty(opt)) {
                    elem.setAttribute(opt, options[opt]);
                }
            }
            for (opt in methods) {
                if (methods.hasOwnProperty(opt)) {
                    elem[opt] = methods[opt];
                }
            }
            appendTo && appendTo.appendChild(elem);
            return elem;
        },
        isArray = function(arr){
            return Object.prototype.toString.call(arr).indexOf("Array") !== -1;
        },
        isUsualObject = function(obj){
            return Object.prototype.toString.call(obj).indexOf("Object") !== -1;
        },
        extend = function(){
            var length = arguments.length,
                src, srcKeys, srcAttr,
                fullCopy = false,
                resAttr,
                res = arguments[0], i = 1, j;

            if (typeof res === "boolean"){
                fullCopy = res;
                res = arguments[1];
                i++;
            }
            while (i !== length){
                src = arguments[i];
                srcKeys = Object.keys(src);
                for (j = 0; j < srcKeys.length; j++){
                    srcAttr = src[srcKeys[j]];
                    if (fullCopy && (isUsualObject(srcAttr) || isArray(srcAttr))){
                        resAttr = res[srcKeys[j]] = res[srcKeys[j]] || (isArray(srcAttr) ? [] : {});
                        extend(fullCopy, resAttr, srcAttr);
                    } else {
                        res[srcKeys[j]] = src[srcKeys[j]];
                    }
                }
                i++;
            }
            return res;
        },
        isHaveClassList = !!("classList" in doc.documentElement
        && doc.documentElement.classList.add
        && doc.documentElement.classList.remove
        && doc.documentElement.classList.contains),
        addClass = (function () {
            return (isHaveClassList) ? function (element, className) {
                element && element.classList.add(className);
            } : function (element, className) {
                var reg = new RegExp("\\s?" + className, "gim"),
                    classObj = element.attributes.getNamedItem("class");
                if (!classObj) {
                    element.setAttribute("class", className);
                } else {
                    if (!reg.test(classObj.textContent)) {
                        classObj.textContent += " " + className;
                    }
                }
            };
        })(),
        removeClass = (function () {
            return (isHaveClassList) ? function (element, className) {
                element.classList.remove(className);
            } : function (element, className) {
                var reg = new RegExp("\\s?" + className, "gim"),
                    classObj = element.attributes.getNamedItem("class"),
                    text;
                if (!!classObj) {
                    text = classObj.textContent.replace(reg, "");
                    element.setAttribute("class", text);
                }
            }
        })(),
        isClassInElement = (function () {
            return isHaveClassList ? function (element, className) {
                return element.classList.contains(className);
            } : function (element, className) {
                var reg = new RegExp("\\s?" + className, "gim"),
                    classObj = element.attributes.getNamedItem("class");
                if (!!classObj) {
                    return reg.test(classObj.textContent)
                } else {
                    return false;
                }
            }
        })(),
        css = function (element, options) {
            var style = element.style, opt;
            for (opt in options) {
                if (options.hasOwnProperty(opt)) {
                    style[opt] = options[opt];
                }
            }
        },
        eventTarget = function(){
            this._listeners = {};
        },
        getEventManager = function(){
            return (new eventTarget());
        },
        eventer,
        self,
        ready = (function(){
            var isLoaded = false;
            return function(callback){
                if (isLoaded){
                    callback && callback();
                } else {
                    var loaded = function(){
                        document.removeEventListener("DOMContentLoaded", loaded);
                        isLoaded = true;
                        callback && callback();
                    }
                    document.addEventListener("DOMContentLoaded", loaded);
                }
            }
        })();

    eventTarget.prototype = {
        constructor: eventTarget,
        attachEvent: function(type, listener){
            if (!this._listeners[type]){
                this._listeners[type] = [];
            }
            this._listeners[type].push(listener);
        },
        fireEvent: function(event){
            var listeners, i, len;
            event = event || {};
            if (typeof event === "string"){
                event = { type: event };
            }
            event.target = event.target || this;
            if (!event.type || !this._listeners[event.type]){
                return false;
            }
            listeners = this._listeners[event.type];
            len = listeners.length;
            for (i = 0; i < len; i++){
                listeners[i].call(this, event);
            }
        },
        detachEvent: function(type, listener){
            var listeners, i, len;
            if (this._listeners[type]){
                listeners = this._listeners[type];
                len = listeners.length;
                for (i = 0; i < len; i++){
                    if (listeners[i] === listener){
                        listeners.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };

    eventer = getEventManager();

    self = {
        ready: ready,
        css: css,
        extend: extend,
        isClassInElement: isClassInElement,
        removeClass: removeClass,
        addClass: addClass,
        createElement: createElement,
        getEventManager: getEventManager,
        attachEvent: function(event, func){
            eventer.attachEvent(event, func);
        },
        detachEvent: function(event, func){
            eventer.detachEvent(event, func);
        },
        fireEvent: function(event){
            eventer.fireEvent(event);
        }
    };

    window.valera = self;
})(document, window);