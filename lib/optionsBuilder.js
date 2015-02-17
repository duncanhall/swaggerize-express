'use strict';

var assert = require('assert'),
    thing = require('core-util-is'),
    path = require('path'),
    builder = require('swaggerize-builder'),
    apiLoader = require('./apiLoader'),
    utils = require('swaggerize-builder/lib/utils');

/**
 *
 * @param options {{
 *  api: string | object,
 *  handlers: string | object,
 *  docspath: string
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

/**
 *
 * @param options {{
 *  api: string | object,
 *  handlers: string | object,
 *  docspath: string,
 *  routes: object,
 *  routePath: string
 * }}
 */
function expressOptions (options) {

    options.api.basePath = utils.prefix(options.api.basePath || '/', '/');
    options.mountpath = utils.unsuffix(options.api.basePath, '/');
    options.docspath = utils.prefix(options.docspath || '/api-docs', '/');

    if ('routePath' in options) {
        options.api.basePath = options.routePath + options.api.basePath;
    }

    return options;
}


exports.swaggerizeOptions = swaggerizeOptions;
exports.expressOptions = expressOptions;