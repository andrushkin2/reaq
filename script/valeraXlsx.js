/**
 * Created by kosiak_man on 21.06.15.
 */
var jszip;
valera.require([
    ["./bower_components/js-xlsx/jszip.js", "JSZip"],
    ["./bower_components/js-xlsx/xlsx.js", "XLSX"]
], function(){
    /*"use strict";*/
    valera.extends.xlsx = window.XLSX;
    valera.asset(!!XLSX, "XLSX variable doesn't exist");
    valera.asset(!!JSZip, "JSZip variable doesn't exist");
    window.XLSX = null;
});