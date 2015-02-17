'use strict';

var path = require('path'),
    utils = require('swaggerize-builder/lib/utils'),
    thing = require('core-util-is'),
    optionsBuilder = require('./optionsBuilder');





/**
 * Routes handlers to express router.
 * @param router
 * @param options {{
 *  api: string | object,
 *  handlers: string | object,
 *  docsPath: string,
 *  basePath: string
 * }}
 */
function expressroutes(router, options) {

    options = optionsBuilder.expressOptions(options);

    var routes = options.routes || [];
    var mountpath = options.mountpath;

    router.get(mountpath + options.docspath, function (req, res) {
        res.json(options.api);
    });

    routes.forEach(function (route) {
        var args, path, before;

        path = route.path.replace(/{([^}]+)}/g, ':$1');
        args = [mountpath + utils.prefix(path, '/')];
        before = [];

        route.validators.forEach(function (validator) {
            var parameter, validate;

            parameter = validator.parameter;
            validate = validator.validate;

            before.push(function validateInput(req, res, next) {
                var value, isPath;

                switch (parameter.in) {
                    case 'path':
                    case 'query':
                        isPath = true;
                        value = req.param(parameter.name);
                        break;
                    case 'header':
                        value = req.header(parameter.name);
                        break;
                    case 'body':
                    case 'form':
                        value = req.body;
                }

                validate(value, function (error, newvalue) {
                    if (error) {
                        res.statusCode = 400;
                        next(error);
                        return;
                    }

                    if (isPath) {
                        req.params[parameter.name] = newvalue;
                    }

                    next();
                });
            });
        });

        if (thing.isArray(route.handler)) {
            if (route.handler.length > 1) {
                Array.prototype.push.apply(before, route.handler.slice(0, route.handler.length - 1));
            }
            route.handler = route.handler[route.handler.length - 1];
        }

        Array.prototype.push.apply(args, before);
        args.push(route.handler);
        router[route.method].apply(router, args);
    });
}





module.exports = expressroutes;
