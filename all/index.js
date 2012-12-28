var util = require('util'),
    path = require('path'),
    fs = require('fs'),
    yeoman = require('../../../../'),
    grunt = require('grunt');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  this.sourceRoot(path.join(__dirname, 'templates'));
}

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.askFor = function askFor() {
	var cb = this.async(),
      self = this;

	var prompts = [
		{
			name: 'appName',
      message: 'Name of the app',
      default: 'myApp'
		},
    {
      name: 'bootstrap',
      message: 'Would you like to include Twitter Bootstrap for Compass instead of CSS?',
      default: 'Y/n'
    }
	];

  self.prompt(prompts, function(e, props) {
    if (e) { return self.emit('error', e); }

    // set the properties
    self.appName = props.appName;
    self.bootstrap = (/y/i).test(props.bootstrap);

    cb();
  });

}

// create the basic app structure
Generator.prototype.createStructure = function createStructure() {
  var cb = this.async(),
      self =  this;

  // OMG IT'S HERE -- CALLBACK HELL !!!
  fs.mkdirSync('app');
  fs.mkdirSync('app/static');
  fs.mkdirSync('app/static/css');
  fs.mkdirSync('app/static/js');
  fs.mkdirSync('app/static/img');
  fs.mkdirSync('app/templates');

  cb();
}

// create the basic files
Generator.prototype.createAppFiles = function createAppFiles() {
  this.template('init.py', 'app/__init__.py');
  this.template('server.py', 'server.py');
}

// create the yeoman and git files
Generator.prototype.createYeomanFiles = function createYeomanFiles() {
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
}

Generator.prototype.end = function end() {
  grunt.log.writeln('\nYour app is ready !\n');
}
