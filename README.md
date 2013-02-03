manchu
======

fu manchu does not obtain his mighty 'stache without, first, pre-compiling it.

## about

manchu is an easy way to create build directives at your application runtime. it supports the following otherwise manual tasks:

* handlebars template pre-compilation
* css/less concatenation and compilation
* javascript compression and concatenation

## usage

this example illustrates how you might do the following:

1. precompile a directory of handlebars templates
2. uglify a directory of javascript files
3. concatenate selected css and less files and minify

```javascript
var manchu = require('manchu')
  , templates
  , scripts,
  , styles;

templates = manchu.createDirective({
	type : 'handlebars',
	input : __dirname + '/templates',
	output : __dirname + '/public/scripts/templates.js'
});

scripts = manchu.createDirective({
	type : 'javascript',
	input : __dirname + '/scripts',
	output : __dirname + '/public/scripts/app.js'
});

styles = manchu.createDirective({
	type : 'stylesheet',
	input : __dirname + '/styles',
	output : __dirname + '/public/styles/styles.css'
});

manchu.build([
	templates,
	styles,
	scripts
], function(err) {
	// start your server or something
});
```
## class reference

### manchu.builder

### manchu.directive