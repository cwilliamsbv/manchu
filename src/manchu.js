/*
 * manchu - carefree handlebars template pre-compilation at runtime
 * author : gordon hall <gordon@gordonwritescode.com>
 */

var Directive = require('./classes/directive.js')
  , Builder = require('./classes/builder.js');

// create a new Directive
 module.exports.createDirective = function(options) {
 	return new Directive(options);
 };

// run a consecutive sequence of Directives using a Builder
 module.exports.build = function(directives, callback) {
 	var builder = new Builder(directives, callback);
 	builder.exec();
 	return builder;
 };