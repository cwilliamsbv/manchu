/*
 * manchu - carefree handlebars template pre-compilation at runtime
 * author : gordon hall <gordon@gordonwritescode.com>
 */

var path = require('path')
  , fs = require('fs')
  , clc = require('cli-color')
  , exec = require('child_process').exec
  , error = clc.red.bold
  , warn = clc.yellow
  , notice = clc.blue
  , bin = __dirname + '/../../node_modules/.bin/'
  , createCommand
  , Directive = require('./directive.js')
  , Builder;

Builder = function(directives, callback) {
	this.directives = directives;
	this.onComplete = callback;
	this.current = 0;
};

Builder.prototype.exec = function(noExec) {
	var builder = this
	  , directive = builder.directives[builder.current];

	if (builder.current <= builder.directives.length) {
		var command = createCommand(directive);
		console.log(notice('Manchu: Executing directive:'));
		console.log(command);
		if (!noExec) {
			exec(command, function(err, stdout, stderr) {
				if (!err && !stderr) {
					builder.current++;
					builder.exec(builder.onComplete);
				} else {
					console.log(error(err || stderr));
				}
			});
		}
	} else {
		builder.current = 0;
		this.onComplete.call(this);
	}
};

createCommand = function(directive) {
	var cmd = {
		handlebars : bin + 'handlebars ',
		stylesheet : bin + 'lessc ',
		javascript : bin + 'uglifyjs '
	} , command = '', inputs = [];

	directive.input.forEach(function(val, index) {
		if (val.isDirectory) {
			var contents = fs.readdirSync(val.path)
			  , basePath = val.path;
			// iterate over dir contents
			contents.forEach(function(val, index) {
				if (fs.statSync(basePath + '/' + val).isFile()) {
					inputs.push(basePath + '/' + val);
				}
			});
		} else {
			inputs.push(val.path);
		}
	});

	command += cmd[directive.type];
	command += directive.flags.join(' ') + ' ';
	command += inputs.join(' ') + ' ';
	command += (directive.type === 'stylesheet') ? ' ' : '--output ' + directive.output;

	return command;
};

module.exports = Builder;
