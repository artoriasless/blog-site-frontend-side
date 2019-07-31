'use strict';

const listPublishHistory = require('./list-publish-history');
const publish = require('./publish');

const ossPusher = {
    listPublishHistory,
    publish,
};

module.exports = ossPusher;