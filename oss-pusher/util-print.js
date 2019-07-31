'use strict';

const print = function() {
    if (arguments) {
        console.info(...arguments); // eslint-disable-line
    }
};

module.exports = print;