/**
 * Created by kosiak_man on 17.06.15.
 */

var fileParser = function(xls, loader){
    var toJson = function(workbook) {
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
    }
};