var assert = require("assert");
var MembershipApplication = require("../models/membership_application");
var moment = require("moment");
var Helpers = require("./helpers")

describe("MembershipApplication requirements", function(){
	var validApp;

	beforeEach(function(){
		validApp = Helpers.validApplication;
	});

	describe("Validations successful if...", function(){
		it("application is valid if all return true", function(){
			assert(validApp.isValid(), "Not valid");
		});
		it("emailis 4+ chars and contains an @", function(){
			assert(validApp.emailIsValid());
		});
		it("height is between 60 and 75 inches", function(){
			assert(validApp.heightIsValid());
		});
		it("age is between 15 and 100", function(){
			assert(validApp.ageIsValid());
		});
		it("weight is between 100 and 300", function(){
			assert(validApp.weightIsValid());
		});
	});
	describe("Application invalid if...", function(){
		/*
		it("it is past validation date", function(){
			var app = new MembershipApplication({validUntil: Date.parse("01/01/2010")});
			assert(app.expired());
		});
		*/
		it("email is 4 chars of less", function(){
			var app = new MembershipApplication({ email: "dd"})
			assert(!app.emailIsValid());
		});
		it("email doesn't include @", function(){
			var app = new MembershipApplication({ email: "thingthingthing:thing.com"})
			assert(!app.emailIsValid());
		});
		it('height is less than 60 inches', function () {
		  var app = new MembershipApplication({height : 10});
		  assert(!app.heightIsValid());
		});
		it('height is more than 75 inches', function () {
		  var app = new MembershipApplication({height : 80});
		  assert(!app.heightIsValid());
		});
		it('height is omitted', function () {
		  var app = new MembershipApplication();
		  assert(!app.heightIsValid());
		});
		it('age is more than 100', function () {
		  var app = new MembershipApplication({age : 101});
		  assert(!app.ageIsValid());
		});
		it('age less than 15', function () {
		  var app = new MembershipApplication({age : 14});
		  assert(!app.ageIsValid());
		});
		it('age is omitted', function () {
		  var app = new MembershipApplication();
		  assert(!app.ageIsValid());
		});
		it('weight less than 100', function () {
		  var app = new MembershipApplication({weight : 99});
		  assert(!app.weightIsValid());
		});
		it('weight less more than 300', function () {
		  var app = new MembershipApplication({weight : 301});
		  assert(!app.weightIsValid());
		});
		it('weight is omitted', function () {
		  var app = new MembershipApplication();
		  assert(!app.weightIsValid());
		});
		it('first is omitted', function () {
		  var app = new MembershipApplication({last: "Ronaldo"});
		  console.log(app);
		  assert(!app.nameIsValid());
		});
		it('last is omitted', function () {
		  var app = new MembershipApplication({first: "Prince"});
		  console.log(app);
		  assert(!app.nameIsValid());
		});
	});
		
});
