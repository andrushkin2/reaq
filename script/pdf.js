/**
 * Created by kosiak_man on 17.07.15.
 */
valera.require([
    ["./bower_components/pdfjs-bower/dist/pdf.js", "PDFJS"],
    ["./bower_components/pdfjs-bower/dist/compatibility.js", "PDFJS"],
    ["./bower_components/pdfjs-bower/dist/pdf.worker.js", "PDFJS"]
], function(){
    "use strict";
    valera.asset(!!PDFJS, "XLSX variable doesn't exist");
    valera.extends.pdfjs = window.PDFJS;
    window.PDFJS = null;
}, true);