const async = require("async");
const assert = require("assert");

const ReviewProcess = function(args){
	assert(args.application, "Need an application to review");
	let app = args.application;

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