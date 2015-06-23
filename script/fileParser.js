/**
 * Created by kosiak_man on 17.06.15.
 */
valera.require([
    ["./script/loader.js", "valera.extends.loader"],
    ["./script/valeraXlsx.js", "valera.extends.xlsx"]
], function(){
    "use strict";

    valera.extends.fileParser = function(){
        var loader = valera.extends.loader(),
            xls = valera.extends.xlsx,
            toJson = function(workbook) {
                var result = {};
                workbook.SheetNames.map(function(sheetName, index) {
                    var rObjArr = xls.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    if(rObjArr.length > 0){
                        result[index] = rObjArr;
                    }
                });
                return result;
            };
        return {
            getData: function(pathToFile, success, error){
                loader.load(pathToFile, function(data){
                    var workbook = xls.read(data, {type:"binary"});
                    success && success(toJson(workbook));
                }, function(e){
                    error && error(e);
                });
            }
        };
    }
});