'use strict';

const fs = require('fs');
const path = require('path');

const readline = require('readline');
const request = require('request');
const co = require('co');
const OSS = require('ali-oss');

const pkg = require('../package.json');
const print = require('./util-print');
const color = require('./util-color');
const ossConfig = require('./oss-config');

const rootUrl = process.cwd();

const userCheck = function(info) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(info, answer => {
        rl.close();
        resolve(answer);
    }));
};

const getFilePathArr = () => {
    const buildPath = path.resolve(rootUrl, 'build');
    const filePathArr = [];
    let dirPathArr = [buildPath];
    let tmpDirPathArr = [buildPath];

    while(dirPathArr.length) {
        dirPathArr = [];

        for (let i = 0; i < tmpDirPathArr.length; i++) {
            const files = fs.readdirSync(tmpDirPathArr[i]);

            files.forEach(file => {
                let filePath = path.resolve(tmpDirPathArr[i], file);

                if (fs.lstatSync(filePath).isDirectory()) {
                    dirPathArr.push(filePath);
                } else {
                    filePathArr.push(filePath);
                }
            });
        }

        tmpDirPathArr = dirPathArr.slice(0);
    }

    return filePathArr;
};

const getPublishHistory = () => {
    const historyJSONUrl = `${ossConfig.domainPrefix}/${ossConfig.staticFolder}/history.json`;
    const requestOpts = {
        json: true
    };
    const syncReq = function(url, opts) {
        return new Promise((resolve, reject) => {
            request(url, opts, (error, response, body) => {
                if (error) {
                    print(color.error, error, color.reset);
                    print('get publish history failed, please try again later...');
                    print();

                    process.exit();

                    reject(error);
                }
                if (response.statusCode != 200 && response.statusCode != 404) {
                    reject('Invalid status code <' + response.statusCode + '>');
                }
                if (response.statusCode == 404) {
                    body = [];
                }
                resolve(body);
            });
        });
    };

    return syncReq(historyJSONUrl, requestOpts);
};

const uploadFile = (name, data) => {
    const client = new OSS(ossConfig);

    return new Promise((resolve, reject) => {
        co(function*() {
            client.useBucket(ossConfig.bucket);

            resolve(yield client.put(name, data));
        }).catch(function(error) {
            reject(error);
        });
    });
};

const publish = async () => {
    const answer = await userCheck(`${color.info}Are you sure to publish static resources into OSS?(y/N) ${color.reset}`);

    if (answer !== 'y') {
        print();
    } else {
        const filePathArr = getFilePathArr();
        const publishFailed = [];
        const ignorePrefix = path.resolve(rootUrl, 'build');

        print();
        print(color.title, `begin to upload static resources into OSS, the count of all files is ${filePathArr.length}...`, color.reset);

        filePathArr.forEach(filePath => {
            const fileData = fs.readFileSync(filePath);
            const fileName = filePath.replace(ignorePrefix, '').replace(/^\/+/, '');

            (async () => {
                try {
                    await uploadFile(fileName, fileData);
                } catch(err) {
                    publishFailed.push(filePath);
                }
            })();
        });

        const history = await getPublishHistory() || [];
        const uploadLog = {};
        const now = new Date();

        uploadLog[pkg.version] = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        history.push(uploadLog);
        (async () => {
            try {
                const tempUrl = path.resolve(rootUrl, 'node_modules/temp_json_file.json');

                fs.writeFileSync(tempUrl, JSON.stringify(history, null, 4));
                await uploadFile(`${ossConfig.staticFolder}/history.json`, fs.readFileSync(tempUrl));
            } catch(err) {} // eslint-disable-line
        })();

        print();
        print(color.title, 'publishment has completed', color.reset);
        print(color.text, `all count: ${filePathArr.length}`, color.reset);
        print(color.text, `failed: ${publishFailed.length}`, color.reset);
        print();
    }
};

module.exports = publish;