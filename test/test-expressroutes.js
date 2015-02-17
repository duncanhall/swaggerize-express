'use strict';

var test = require('tape'),
    expressroutes = require('../lib/expressroutes'),
    express = require('express');

test('express routes', function (t) {

    t.test('test api', function (t) {
        t.plan(3);

        var router = express.Router();

        expressroutes(router, {
            api: require('./fixtures/defs/pets.json'),
            routes: [
                {
                    method: 'get',
                    path: '/pets/:id',
                    validators: [],
                    handler: function (req, res) {}
                }
            ]
        });

        var stack = router.stack;

        t.strictEqual(stack.length, 2, '2 routes added.');
        t.strictEqual(stack[0].route.path, '/v1/petstore/api-docs', 'api-docs added.');
        t.strictEqual(stack[1].route.path, '/v1/petstore/pets/:id', 'hello added.');
    });

    t.test('test no handlers', function (t) {
        t.plan(2);

        var router = express.Router();

        expressroutes(router, {
            api: require('./fixtures/defs/pets.json'),
            validators: [],
            routes: []
        });

        var stack = router.stack;

        t.strictEqual(stack.length, 1, 'only api-docs route added.');
        t.strictEqual(stack[0].route.path, '/v1/petstore/api-docs', 'api-docs added.');
    });

    t.test('test middlewares in handler', function (t) {
        t.plan(4);

        var router = express.Router();

        expressroutes(router, {
            api: require('./fixtures/defs/pets.json'),
            routes: [
                {
                    method: 'get',
                    path: '/pets',
                    validators: [],
                    handler: [
                        function m1(req, res, next) {},
                        function (req, res) {}
                    ]
                }
            ]
        });

        var stack = router.stack;

        t.strictEqual(stack.length, 2, '2 routes added.');
        t.strictEqual(stack[1].route.path, '/v1/petstore/pets', '/pets added.');
        t.strictEqual(stack[1].route.stack.length, 2, '/pets has middleware.');
        t.strictEqual(stack[1].route.stack[0].name, 'm1', '/pets has middleware named m1.');
    });
});
