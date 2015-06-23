/**
 * Created by kosiak_man on 21.06.15.
 */
valera.require([
    ["./bower_components/js-xlsx/jszip.js", "JSZip"],
    ["./bower_components/js-xlsx/xlsx.js", "XLSX"]
], function(){
    "use strict";
    valera.extends.xlsx = window.XLSX;
    window.jszip = JSZip;
    XLSX = null;
    JSZip = null;
});