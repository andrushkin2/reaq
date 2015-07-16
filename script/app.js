(function (doc, win) {
    var createElement = function (nodeName, attrs, methods, appendTo) {
            var elem = doc.createElement(nodeName), opt;
            for (opt in attrs) {
                if (attrs.hasOwnProperty(opt)) {
                    elem.setAttribute(opt, attrs[opt]);
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
        self,
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
        head = doc.getElementsByTagName("head")[0] || doc.documentElement,
        getScript = function(path, success, fail){
            var done = false,
                script = createElement("script", {
                    src: path,
                    type: "text/javascript",
                    charset: "utf-8"
                }),
                removeScript = function(){
                    // Handle memory leak in IE
                    script.onload = script.onreadystatechange = script.onerror = null;
                    if ( head && script.parentNode ) {
                        head.removeChild( script );
                    }
                };
            script.onload = script.onreadystatechange = function() {
                if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                    done = true;
                    success && success();
                    removeScript();
                }
            };
            script.onerror = function(){
                fail && fail();
                removeScript();
            };
            head.insertBefore(script, head.firstChild );
        },
        require = (function(){
            var isObjectExist = function(objectString){
                    var result = window,
                        i, len,
                        parts;
                    if (objectString && typeof objectString === "string"){
                        parts = objectString.split(".");
                        for (i = 0, len = parts.length; i < len; i++){
                            if (result){
                                result = result[parts[i]];
                            } else {
                                break;
                            }
                        }
                        return !!result;
                    } else {
                        return false;
                    }
                };
            return function(objects, callback){
                self.asset(objects instanceof Array, "require objects should be an array");
                var len = objects.length,
                    obj,
                    loadedCount = 0,
                    getFile = function(obj, objCheck, callback){
                        var count = 3,
                            reload = function(){
                                count--;
                                if (count){
                                    getScript(obj, success, reload);
                                } else {
                                    throw new Error("Cannot load file: " + obj);
                                }
                            },
                            success = function(){
                                var timer;
                                timer = setInterval(function(){
                                    if (isObjectExist(objCheck)){
                                        clearInterval(timer);
                                        callback && callback();
                                    }
                                }, 100);
                            };
                        getScript(obj, success, reload);
                    },
                    loaded = function(){
                        loadedCount++;
                        (loadedCount === len) && callback && callback();
                    },
                    i;

                if (len === 0){
                    callback && callback();
                    return;
                }
                for (i = 0; i < len; i++){
                    obj = objects[i];
                    isObjectExist(obj[1]) ? loaded() : getFile(obj[0], obj[1], loaded);
                }
            };
        })(),
        createId = (function(){
            var getRandomInt = function( min, max ) {
                    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
                },
                i,
                length = 8,
                timestamp = +new Date;
            return function() {
                var ts = timestamp.toString(),
                    parts = ts.split( "" ).reverse(),
                    id = "";

                for( i = 0; i < length; ++i ) {
                    id += parts[getRandomInt(0, parts.length - 1)];
                }
                return id;
            };
        })(),
        asset = function(isTrue, errorText){
            if (!isTrue){
                throw new Error(errorText);
            }
        },
        ready = (function(){
            var isLoaded = false;
            return function(callback){
                if (isLoaded){
                    callback && callback();
                } else {
                    var loaded = function(){
                        doc.removeEventListener("DOMContentLoaded", loaded);
                        isLoaded = true;
                        callback && callback();
                    };
                    doc.addEventListener("DOMContentLoaded", loaded);
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
                listeners[i].call(this, event, arguments);
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
        extends: {},
        css: css,
        asset: asset,
        extend: extend,
        require: require,
        isClassInElement: isClassInElement,
        removeClass: removeClass,
        addClass: addClass,
        createId: createId,
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

    win.valera = self;
})(document, window);