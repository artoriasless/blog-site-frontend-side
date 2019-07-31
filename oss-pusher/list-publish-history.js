'use strict';

const request = require('request');

const print = require('./util-print');
const color = require('./util-color');
const ossConfig = require('./oss-config');

const listPublishHistory = async () => {
    const historyJSONUrl = `${ossConfig.domainPrefix}/${ossConfig.staticFolder}/history.json`;
    const requestOpts = {
        json: true
    };

    request(historyJSONUrl, requestOpts, (err, res, history) => {
        if (err) {
            print(color.error, err, color.reset);
            print();
        } else {
            let lastVersion = '';
            let dateCount = 1;

            for (let i = 0; i < history.length; i++) {
                let version = Object.keys(history[i])[0];
                let date = Object.values(history[i])[0];

                if (version !== lastVersion) {
                    lastVersion = version;
                    dateCount = 1;

                    print('\n', color.title, `${version}`, color.reset);
                    print(color.text, `  [${dateCount}].${date}`, color.reset);
                } else {
                    dateCount++;

                    print(color.text, `  [${dateCount}].${date}`, color.reset);
                }
            }

            if (history.length === 0) {
                print('\n', color.info, 'there\'s no version published before...', color.reset);
            }

            print('\n');
        }
    });
};

module.exports = listPublishHistory;

/**

history = [
    {
        "1.0.0": "2011-11-11 11:11:11"
    }
]

*/