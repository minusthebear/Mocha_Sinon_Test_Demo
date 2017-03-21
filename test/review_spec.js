const assert = require("assert");
const ReviewProcess = require("../processes/review");
const Helpers = require("./helpers");
const sinon = require("sinon");

describe("The Review Process", function(){
	describe("Receiving a valid application", function(){
		let decision;
		let validApp = Helpers.validApplication;
		let review = new ReviewProcess({application: validApp});
		
		// See notes below for spy functions which work and which don't work

		// With spies, you don't want to invoke the method or function you want to use.
		// You want to specify "spy" as the function to be called and you leave that to the EventEmitter.
		
		sinon.spy(review, "ensureAppValid");
		sinon.spy(review, "findNextMission");
		sinon.spy(review, "roleIsAvailable");
		sinon.spy(review, "ensureRoleCompatible");

		before(function(done){
			review.processApplication(function(err, result){
				decision = result;
				done();
			});
		});

		it("returns success", function(){
			assert(decision.success, decision.message);
		});
		it("ensures app is valid", function(){
			assert(review.ensureAppValid.called);
		});
		it("selects a mission", function(){
			assert(review.findNextMission.called);
		});
		it("ensures a role exists", function(){
			assert(review.roleIsAvailable.called);
		});
		it("ensures role compatibility", function(){
			assert(review.ensureRoleCompatible.called);
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

		// This works, too:
		//	let review = new ReviewProcess({application: validApp});
		/*
		 *	sinon.spy(review, "ensureAppValid");
		 *	sinon.spy(review, "findNextMission");
		 *	sinon.spy(review, "roleIsAvailable");
		 *	sinon.spy(review, "ensureRoleCompatible");
		 */