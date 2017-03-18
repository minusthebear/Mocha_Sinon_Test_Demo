var assert = require("assert");
var MembershipApplication = require("../membership_application");

describe("MembershipApplication requirements", function(){
	var validApp;

	beforeEach(function(){
		validApp = new MembershipApplication({
			first: "Test",
			last: "User",
			email: "test@test.com",
			age: 30,
			height: 66,
			weight: 180
		});
	});

	describe("Validations successful if...", function(){
		it("application is valid if all return true", function(){
			assert(validApp.isValid(), "Not valid");
		});
		it("emailis 4+ chars and contains an @", function(){
			assert(validApp.emailIsValid());
		});
		it("first and last names are provided", function(){
			assert(validApp.nameIsValid());
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
		  assert(!app.nameIsValid());
		});
		it('last is omitted', function () {
		  var app = new MembershipApplication({first: "Prince"});
		  assert(!app.nameIsValid());
		});
	});
		
});
