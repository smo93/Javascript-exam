"use strict";

function beerAndFries(data) {
    var sortFunction = function(a, b) {
            return a.score- b.score;
        },
        beers = data.filter(function(elem) {
            return elem.type === "beer";
        }).sort(sortFunction),
        fries = data.filter(function(elem) {
            return elem.type === "fries";
        }).sort(sortFunction),
        totalScore = 0;

    beers.forEach(function(_, i) {
        totalScore += beers[i].score * fries[i].score;
    });

    return totalScore;
}

exports.beerAndFries =beerAndFries;
