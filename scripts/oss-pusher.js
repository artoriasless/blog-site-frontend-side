'use strict';

const argv = process.argv;
const type = argv[argv.length - 1];

const ossPusher = require('../oss-pusher');

switch(type) {
case '--history':
    (async function() {
        await ossPusher.listPublishHistory();
    })();
    break;
case '--publish':
    (async function() {
        ossPusher.publish();
    })();
    break;
default:
    console.info('\x1b[31m', '\nplease pass right parameter!\n', '\x1b[0m');   // eslint-disable-line
}