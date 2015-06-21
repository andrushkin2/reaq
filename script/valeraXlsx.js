/**
 * Created by kosiak_man on 21.06.15.
 */
valera.require([
    ["./bower_components/js-xlsx/xlsx.js", "XLSX"],
    ["./bower_components/js-xlsx/jszip.js", "JSZip"]
], function(){
    "use strict"
    valera.extends.xlsx = window.XLSX;

    XLSX = null;
});