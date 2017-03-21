const moment = require("moment");
const MissionControl = require("../models/mission_control");
const assert = require("assert");
const db = require("../db");
const sinon = require("sinon");
const Mission = require("../models/mission");

sinon.stub(db, "getMissionByLaunchDate").yields(null, null);
sinon.stub(db, "createNextMission").yields(null, new Mission());
const missionControl = new MissionControl({ db: db });

describe("Mission Control", function(){ 
	describe("No current mission", function(){
		
		let currentMission;
		before(function(done){
			missionControl.currentMission(function(err, res){
				currentMission = res;
				done();
			});
		});
		// Stubs are like spies, except they return something
		it("is created if none exist", function(){
			assert(currentMission);
			assert(db.getMissionByLaunchDate.called);
			currentMission = null;
		});
	});
	describe("Current mission exists", function(){
		var currentMission;
		before(function(done){
			db.getMissionByLaunchDate.restore(); //unwrap it
			sinon.stub(db, "getMissionByLaunchDate").yields(null, {id: 1000});
			missionControl.currentMission(function(err, res){
				currentMission = res;
				console.log(currentMission);
				done();
			});
		});
		// Stubs are like spies, except they return something
		it("is returns mission 1000", function(){
			// assert.equal(currentMission.id, 1000);
			assert.equal(currentMission.id, 1000);
			assert(db.getMissionByLaunchDate.called);
		});
	});
}); 