const moment = require("moment");
const MissionControl = require("../models/mission_control");
const assert = require("assert");
const Helpers = require("./helpers");
const DB = require("../db");
const sinon = require("sinon");
const Mission = require("../models/mission");

describe("Mission Control", function(){

	let missionControl, db;

	before(function(){
		db = Helpers.stubDb();
		missionControl = new MissionControl({db: db});
	});

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