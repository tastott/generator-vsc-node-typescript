///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
import chai = require('chai')
var expect = chai.expect;

import app = require('../app')

describe('Example app tests', () => {
	it('Should say Hello from <%= projectName %>!', () => {
		expect(app.GetMessage()).to.be.equal('Hello from <%= projectName %>!')
	})
})