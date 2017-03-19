const assert = require("assert");
const ReviewProcess = require("../processes/review");
const MembershipApplication = require("../membership_application");
const sinon = require("sinon");

describe("The Review Process", function(){
	describe("Receiving a valid application", function(){
		let decision;
		let validApp = new MembershipApplication({
			first: "Test",
			last: "User",
			email: "test@test.com",
			age: 30,
			height: 66,
			weight: 180
		});
		let review = new ReviewProcess();
		let spy = sinon.spy();
		
		// See notes below for spy functions which work and which don't work

		// With spies, you don't want to invoke the method or function you want to use.
		// You want to specify "spy" as the function to be called and you leave that to the EventEmitter.
		
		before(function(done){
			review.on("validated", spy);
			review.on("mission-selected", spy);
			review.on("role-available", spy);
			review.on("role-compatible", spy);
			review.processApplication(validApp, function(err, result){
				decision = result;
				done();
			});
		});

		it("returns success", function(){
			assert(decision.success, decision.message);
		});
		it("validates email", function(){
			assert.equal(spy.callCount, 4);
			// For one call
			// assert(spy.called);
		});
	});
});

		// This works
		// let spy = sinon.spy(validApp, "emailIsValid");

		// This works
		/*
		 *	it("validates email", function(){
		 *		assert(validApp.emailIsValid.called);
		 *	});
		 */

		// Here, the instance of the review process is put in the spy, see comment below
		// let spy = sinon.spy(review, "ensureAppValid");

		// Not working function
		// Reason is, Sinon requires a process to call a function directly
		// It can't be the result of an event trigger
		/* 
		 *	it("validates email", function(){
		 *		assert(review.ensureAppValid.called);
		 *	});
		 *
		 */