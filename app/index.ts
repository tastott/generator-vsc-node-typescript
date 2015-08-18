///<reference path="../typings/yeoman-generator/yeoman-generator.d.ts" />
import yeoman = require('yeoman-generator')
var yosay = require('yosay')

export = yeoman.generators.Base.extend({
	initializing: function() {
		this.appname = this.appname.replace(/\s+/g, '-'); //Yo removes dashes in folder name for some reason, put them back
		this.parameters = {};
		this.log(yosay('Apparently a gratingly twee message normally goes here.'));
	},
	prompting: function() {
		var done = this.async();
    	this.prompt([
			{
				type    : 'input',
				name    : 'name',
				message : 'Your project name',
				default : this.appname // Default to current folder name
			},
			{
				type    : 'input',
				name    : 'nw',
				message : 'Include node-webkit/Angular app? (y/n)'
			}
		], function (answers) {
      		this.parameters.projectName = answers.name;
			this.parameters.nw = answers.nw === 'y';
      		done();
		}.bind(this));
	},
	writing: {
		"main": function() {
			
			this.parameters.nodemain = this.parameters.nw ? 'index.html' : 'app.js';
			this.parameters.nodestart = this.parameters.nw ? 'node_modules/.bin/nw ./' : 'node app.js';
			
			this.directory(".settings");
			this.directory('test');
			this.template('_package.json', 'package.json',this.parameters);
			this.template('_settings.json', '.settings/settings.json');
			this.template('_launch.json', '.settings/launch.json');
			this.template('_tasks.json', '.settings/tasks.json');
			this.template('_tsconfig.json', 'tsconfig.json');
			this.template('_app.ts', 'app.ts', this.parameters);
			this.template('_app-test.ts', 'test/app.ts', this.parameters);
			
			if(this.parameters.nw){
				this.directory('controllers');
				this.directory('views');
				this.template('nw/_index.html', 'index.html', this.parameters);
				this.template('nw/_angular-app.ts', 'angular-app.ts', this.parameters);
				this.template('nw/_home.html', 'views/home.html', this.parameters);
				this.template('nw/_home.ts', 'controllers/home.ts', this.parameters);
			}
		}
	},
	install: function() {
		this.npmInstall(['mocha', 'chai'], {saveDev: true});
		if(this.parameters.nw) this.npmInstall(['nw', 'angular', 'angular-route', 'bootstrap'], {save: true});
		
	},
	end: function() {
		var modules = ['node', 'mocha', 'chai'];
		if(this.parameters.nw) modules = modules.concat(['angular', 'angular-route']);
		
		this.spawnCommand('tsd', ['install'].concat(modules));
	}
});