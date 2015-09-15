/**
 * Created by kosiak_man on 13.08.15.
 */
valera.require([], function() {
    "use strict";
    valera.extends.dataSpliter = function(data, amountData){
        var obj = {},
            i,
            result = [],
            counter = amountData || 20,
            maxIndex = data.length - 1,
            getRandomInt = function(min, max) {
                return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
            };
        while(counter){
            i = getRandomInt(0, maxIndex);
            if (!obj[i]){
                obj[i] = true;
                result.push(data[i]);
                counter--;
            }
        }
        return result;
    };
});