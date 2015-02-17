'use strict';

var assert = require('assert'),
    thing = require('core-util-is'),
    path = require('path'),
    builder = require('swaggerize-builder'),
    apiLoader = require('./apiLoader');

/**
 *
 * @param options {{
 *  api: string | object,
 *  handlers: string | object,
 *  docsPath: string,
 *  basePath: string
 * }}
 */
function swaggerizeOptions(options) {

    assert.ok(thing.isObject(options), 'Expected options to be an object.');
    assert.ok(options.api, 'Expected an api definition.');

    if (thing.isString(options.api)) {
        options.api = apiLoader(options.api);
    }

    assert.ok(thing.isObject(options.api), 'Api definition must resolve to an object.');

    options.routes = builder(options);
    return options;
}


module.exports = swaggerizeOptions;