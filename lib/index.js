'use strict';

var express = require('express'),
    path = require('path'),
    expressroutes = require('./expressroutes'),
    optionsBuilder = require('./optionsBuilder');

/**
 *
 * @param options {{
 *  api: string | object,
 *  handlers: string | object,
 *  docsPath: string
 * }}
 */
function swaggerize(options) {

    var router = express.Router();

    options = optionsBuilder.swaggerizeOptions(options);
    expressroutes(router, options);

    return router;
}

module.exports = swaggerize;