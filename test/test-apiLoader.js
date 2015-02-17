'use strict';

var test = require('tape'),
    path = require('path'),
    apiLoader = require('../lib/apiLoader');


test('apiLoader', function (t) {

    t.test('Loads .yaml', function (t) {
        t.plan(2);

        var api;
        t.doesNotThrow(function () {
            api = apiLoader(path.join(__dirname, './fixtures/defs/pets.yaml'));
        });
        t.equal(api.info.title, 'Swagger Petstore');
    });

    t.test('Loads .yml', function (t) {
        t.plan(2);

        var api;
        t.doesNotThrow(function () {
            api = apiLoader(path.join(__dirname, './fixtures/defs/pets.yml'));
        });
        t.equal(api.info.title, 'Swagger Petstore');
    });

    t.test('Loads .json', function (t) {
        t.plan(2);

        var api;
        t.doesNotThrow(function () {
            api = apiLoader(path.join(__dirname, './fixtures/defs/pets.json'));
        });
        t.equal(api.info.title, 'Swagger Petstore');
    });
});