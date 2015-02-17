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
function swaggerizeApp(options) {

    options = swaggerizeOptions(options);

    var app = express();
    app.once('mount', mount(options));

    return app;
}


/**
 * Onmount handler.
 * @param options
 * @returns {onmount}
 */
function mount(options) {
    return function onmount(parent) {
        parent._router.stack.pop();

        Object.defineProperty(parent, 'api', {
            enumerable: false,
            value: options.api
        });

        Object.defineProperty(parent, 'setHost', {
            enumerable: true,
            value: function (value) {
                options.api.host = value;
            }
        });

        expressroutes(parent._router, options);
    };
}


module.exports = swaggerizeApp;