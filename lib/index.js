'use strict';

var express = require('express'),
    path = require('path'),
    expressroutes = require('./expressroutes'),
    swaggerizeOptions = require('./swaggerizeOptions');


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

    options = swaggerizeOptions(options);
    expressroutes(router, options);

    return router;
}

module.exports = swaggerize;