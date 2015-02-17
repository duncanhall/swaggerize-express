'use strict';

var test = require('tape'),
    swaggerizeOptions = require('../lib/swaggerizeOptions'),
    path = require('path');

test('swaggerizeOptions', function (t) {

    t.test('api as json path', function (t) {
        t.plan(1);

        t.doesNotThrow(function () {
            swaggerizeOptions({
                api: path.join(__dirname, './fixtures/defs/pets.json'),
                handlers: path.join(__dirname, 'fixtures/handlers')
            });
        });
    });

    t.test('api as object', function (t) {
        t.plan(1);

        t.doesNotThrow(function () {
            swaggerizeOptions({
                api: require('./fixtures/defs/pets.json'),
                handlers: path.join(__dirname, 'fixtures/handlers')
            });
        });
    });

});
