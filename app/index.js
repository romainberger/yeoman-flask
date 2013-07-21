
'use strict';

var util   = require('util')
  , path   = require('path')
  , fs     = require('fs')
  , yeoman = require('yeoman-generator')
  , exec   = require('child_process').exec

module.exports = Generator

function Generator() {
  yeoman.generators.Base.apply(this, arguments)

  this.sourceRoot(path.join(__dirname, 'templates'))
}

util.inherits(Generator, yeoman.generators.NamedBase)

Generator.prototype.askFor = function askFor() {
  var cb   = this.async()
    , self = this

  var prompts = [
    {
      name: 'appName',
      message: 'Name of the app',
      default: 'app'
    },
    {
      type: 'confirm',
      name: 'compassBootstrap',
      message: 'Would you like to include Twitter Bootstrap for Compass instead of CSS?',
      warning: 'Yes: All Twitter Bootstrap files will be placed into the css directory.'
    },
    {
      type: 'confirm',
      name: 'bootstrap',
      message: 'Would you like to include the Twitter Bootstrap JS plugins?',
      warning: 'Yes: All Twitter Bootstrap plugins will be placed into the JavaScript vendor directory.',
    },
    {
      type: 'confirm',
      name: 'frozenFlask',
      message: 'Do you want to use Frozen-Flask to build a static version of the app?',
      warning: 'Yes: You will be able to build a static version of your app with `$ python freeze.py`.'
    }
  ]

  self.prompt(prompts, function(props) {
    // set the properties
    self.appName = props.appName
    self.compassBootstrap = props.compassBootstrap
    self.bootstrap = props.bootstrap
    self.frozenFlask = props.frozenFlask

    cb()
  })
}

// The Bootstrap functions are copies from the basic Yeoman app generator, edited to fit with the flask app structure
// Bootstrap plugins
Generator.prototype.fetchBootstrap = function fetchBootstrap() {
  // prevent the bootstrap fetch is user said NO
  if(this.bootstrap) {

    var cb   = this.async()
      , self = this

    // third optional argument is the branch / sha1. Defaults to master when ommitted.
    this.remote('twitter', 'bootstrap', 'v2.1.0', function(err, remote, files) {
      if (err) { return cb(err) }

      'affix alert button carousel collapse dropdown modal popover scrollspy tab tooltip transition typeahead'.split(' ')
      .forEach(function( el ) {
        var filename = 'bootstrap-' + el + '.js'
        remote.copy('js/' + filename, self.appName + '/static/js/vendors/bootstrap/' + filename)
      })

      cb()
    })
  }
}

// Bootstrap css / scss
Generator.prototype.compassBootstrapFiles = function compassBootstrapFiles() {
  if ( this.compassBootstrap ) {
    var cb   = this.async()
      , self = this

    this.write(this.appName + '/static/css/main.scss', '@import "compass_twitter_bootstrap";')

    this.remote('kristianmandrup', 'compass-twitter-bootstrap', 'c3ccce2cca5ec52437925e8feaaa11fead51e132', function(err, remote) {
      if (err) { return cb(err) }

      remote.directory('stylesheets', self.appName + '/static/css')

      cb()
    })
  }
  else {
    this.log.writeln('Writing compiled Bootstrap')
    this.copy('bootstrap.css', this.appName + '/static/css/bootstrap.css')
  }
}

Generator.prototype.bootstrapImages = function bootstrapImages() {
  this.copy('glyphicons-halflings.png', this.appName + '/static/img/glyphicons-halflings.png')
  this.copy('glyphicons-halflings-white.png', this.appName + '/static/img/glyphicons-halflings-white.png')
}

// create the basic files
Generator.prototype.createAppFiles = function createAppFiles() {
  this.template('init.py', this.appName + '/__init__.py')
  this.template('server.py', 'server.py')
  this.template('views.py', this.appName + '/views.py')
  this.copy('index.html', this.appName + '/templates/index.html')
  this.copy('base.html', this.appName + '/templates/base.html')
  this.copy('jquery-1.8.3.min.js', this.appName + '/static/js/vendors/jquery-1.8.3.min.js')

  // make the server file executable
  exec('chmod a+x server.py')
}

// create the frozen-flask file to build a static version of the app
Generator.prototype.createFreezeFile = function createFreezeFile() {
  if (this.frozenFlask) {
    this.template('freeze.py', 'freeze.py')
  }
}

// create the yeoman and git files
Generator.prototype.createYeomanFiles = function createYeomanFiles() {
  this.template('Gruntfile.js', 'Gruntfile.js')
  this.copy('gitignore', '.gitignore')
  this.copy('gitattributes', '.gitattributes')
  this.copy('Makefile', 'Makefile')
}

Generator.prototype.end = function end() {
  this.log.writeln('\nYour app is ready !')
  this.log.writeln('Run `$ make -j server` to start running it\n')
}
