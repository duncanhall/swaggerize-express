'use strict';

var yaml = require('js-yaml'),
    fs = require('fs');

/**
 * Loads the api from a path, with support for yaml..
 * @param apiPath
 * @returns {Object}
 */
function loadApi(apiPath) {
    if (apiPath.indexOf('.yaml') === apiPath.length - 5 || apiPath.indexOf('.yml') === apiPath.length - 4) {
        return yaml.load(fs.readFileSync(apiPath));
    }
    return require(apiPath);
}

module.exports = loadApi;