/**
 *	Server task for yeoman-flask
 */

var exec = require('child_process').exec;

module.exports = function(grunt) {

	grunt.registerTask('server', 'Server task for yeoman-flask', function() {
		exec('./server.py');
	});
}
