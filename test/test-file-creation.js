
'use strict'

var path    = require('path')
  , helpers = require('yeoman-generator').test
  , assert  = require('assert')
  , fs      = require('fs')


describe('Yeoman Wordpress generator test', function() {

  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err)
      }

      this.app = helpers.createGenerator('flask:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ])
      done()
    }.bind(this))
  })

  it('every generator can be required without throwing', function() {
    this.app = require('../app')
  })

  it('creates expected files', function(done) {
    var expected = [
      '.gitignore',
      '.gitattributes',
      'Gruntfile.js'
    ]

    this.flask.app.run({}, function() {
      helpers.assertFiles(expected)
      done()
    })
  })

})
