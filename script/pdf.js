/**
 * Created by kosiak_man on 17.07.15.
 */
valera.require([
    ["./bower_components/jspdf/examples/js/jquery/jquery-1.7.1.min.js", "jQuery"],
    ["./bower_components/jspdf/examples/js/jquery/jquery-ui-1.8.17.custom.min.js", "jQuery"],
    //["./bower_components/jspdf/examples/js/html2canvas"],
    ["./bower_components/jspdf/dist/jspdf.debug.js", "jsPDF"]
], function(){
    "use strict";
    valera.asset(!!jsPDF, "jsPDF variable doesn't exist");
    valera.extends.jspdf = window.jsPDF;
    //window.jsPDF = null;
}, true);