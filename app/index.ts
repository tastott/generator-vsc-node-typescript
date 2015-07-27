///<reference path="../typings/yeoman-generator/yeoman-generator.d.ts" />
import yeoman = require('yeoman-generator')
var yosay = require('yosay')

export = yeoman.generators.Base.extend({
	initializing: function() {
		this.parameters = {};
		this.log(yosay('Apparently a gratingly twee message normally goes here.'));
	},
	prompting: function() {
		var done = this.async();
    	this.prompt({
      		type    : 'input',
	      	name    : 'name',
	      	message : 'Your project name',
	      	default : this.appname // Default to current folder name
	    }, function (answers) {
      		this.parameters.projectName = answers.name;
      		done();
		}.bind(this));
	},
	writing: {
		"main": function() {
			this.directory(".settings");
			this.directory('test');
			this.template('_package.json', 'package.json',this.parameters);
			this.template('_settings.json', '.settings/settings.json');
			this.template('_tasks.json', '.settings/tasks.json');
			this.template('_tsconfig.json', 'tsconfig.json');
			this.template('_app.ts', 'app.ts', this.parameters);
			this.template('_app-test.ts', 'test/app.ts', this.parameters);
		}
	},
	install: function() {
		this.npmInstall(['mocha', 'chai'], {saveDev: true});
		
	},
	end: function() {
		this.spawnCommand('tsd', ['install', 'node', 'mocha', 'chai']);
	}
});