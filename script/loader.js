/**
 * Created by kosiak_man on 08.04.15.
 */

loader = (function(window, document){
    var getRequest = function(){
            return (new XMLHttpRequest());
        };
    return {
        load: function(filePath, success, error){
            var request = getRequest();
            request.open("GET", filePath, true);
            request.responseType = "arraybuffer";
            request.onload = function() {
                var arraybuffer = request.response,
                    data = new Uint8Array(arraybuffer),
                    arr = [], i, len = data.length;
                for(i = 0; i != len; ++i){
                    arr[i] = String.fromCharCode(data[i]);
                }
                success && success(arr.join(""));
            }
            request.onerror = function(e){
                error && error(e);
            }
            request.send();
        }
    }
})(window, document);
