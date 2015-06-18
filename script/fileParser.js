/**
 * Created by kosiak_man on 17.06.15.
 */

var fileParser = function(xls, loader){
    var toJson = function(workbook) {
        var result = {};
        workbook.SheetNames.map(function(sheetName, index) {
            debugger;
            var rObjArr = xls.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if(rObjArr.length > 0){
                result[index] = rObjArr;
            }
        });
        return result;
    };

    return {
        getData: function(pathToFile){
            loader.load(pathToFile, function(data){
                var workbook = xls.read(data, {type:"binary"}),
                    jsonData = toJson(workbook);
                debugger;


            }, function(error){
                throw new Error(error);
            });
        }
    }
};