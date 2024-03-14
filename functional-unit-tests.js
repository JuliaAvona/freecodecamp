const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('GET /hello?name=[name] => "hello [name]"', function () {
    // #1
    test('?name=Guest', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=Guest')
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.text, 'hello Guest', 'Response should be "hello John"');
          done();
        });
    });
    // #2
    test('?name=Guest1', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=Guest1')
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.text, 'hello Guest1', 'Response should be "hello Guest1"');
          done();
        });
    });
    // #3
    test('send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({
          surname: "Colombo"
        })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.type, 'application/json', 'application/json');
          assert.equal(res.body.name, 'Cristoforo', 'Cristoforo');
          assert.equal(res.body.surname, 'Colombo', 'Colombo');
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai.request(server)
        .put('/travellers')
        .send({ surname: "da Verrazzano" })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.type, 'application/json', 'application/json');
          assert.equal(res.body.name, 'Giovanni', 'Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano', 'da Verrazzano');
          done();
        })
    });
  });
});

const Browser = require('zombie');
Browser.site = 'https://3000-freecodecam-boilerplate-5jazpfy4qb0.ws-us110.gitpod.io/';

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);

  const browser = new Browser();
  suiteSetup(function (done) {
    return browser.visit('/', done);
  });

  suite('Headless browser', function () {
    test('should have a working "site" property', function () {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({
          surname: "Colombo"
        })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.type, 'application/json', 'application/json');
          assert.equal(res.body.name, 'Cristoforo', 'Cristoforo');
          assert.equal(res.body.surname, 'Colombo', 'Colombo');
          done();
        });
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({
          surname: "Vespucci"
        })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.type, 'application/json', 'application/json');
          assert.equal(res.body.name, 'Amerigo', 'Amerigo');
          assert.equal(res.body.surname, 'Vespucci', 'Vespucci');
          done();
        });
    });
  });
});
