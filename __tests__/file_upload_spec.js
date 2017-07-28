'use strict';

const frisby = require('../src/frisby');
const mocks = require('./fixtures/http_mocks');
const fs = require('fs');

const testHost = 'http://api.example.com';

describe('File Uploads', function() {

  it('should accept and process a FormData object as the "body" parameter', function(doneFn) {
    mocks.use(['fileUploadPng']);

    let logoImage = __dirname + '/fixtures/frisby-logo.png';
    let form = frisby.formData();

    form.append('file', fs.createReadStream(logoImage));

    frisby
      .post(`${testHost}/upload`, {
        body: form
      })
      .expect('status', 200)
      .expect('header', 'Content-Type', 'image/png')
      .done(doneFn);
  });

  it('should handle file contents as a response', function(doneFn) {
    mocks.use(['fileContents']);

    frisby
      .get(`${testHost}/files/logo.png`)
      .expect('status', 200)
      .expect('header', 'Content-Type', 'image/png')
      .done(doneFn);
  });

});
