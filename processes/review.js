const async = require("async");
const assert = require("assert");
const MissionControl = require("../models/mission_control");

const ReviewProcess = function(args){
	assert(args.application, "Need an application to review");
	assert(args.db, "Need a database instance");
	let app = args.application;
	let db = args.db;
	let missionControl = new MissionControl({
		db : db
	});

	this.ensureAppValid = function(next){
		if(app.isValid()){
			next(null, true);
		} else {
			next(app.validationMessage(), null);
		}
	};

	this.findNextMission = function(next){
		const mission = {
			commander: null,
			pilot: null,
			MAVPilot: null,
			passenger: []
		};
		next(null, mission);
	};

	this.roleIsAvailable = function(next){
		next(null, true);
	};

	this.ensureRoleCompatible = function(next){
		next(null, true);
	};

	this.approveApplication = function(next){
		next(null,true);
	};

	this.processApplication = function(next){
		async.series({
			validated: this.ensureAppValid,
			mission: this.findNextMission,
			roleAvailable: this.roleIsAvailable,
			roleCompatible: this.ensureRoleCompatible,
			success: this.approveApplication
		}, function(err, result){
			if(err){
				next(null, {
					success: false,
					message: err
				});
			}else{
				result.message = "Welcome to Mars!";
				console.log(result);
				next(null, result);
			}
		});
	};
};

module.exports = ReviewProcess;