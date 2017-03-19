const Emitter = require("events").EventEmitter;
const util = require("util");

const ReviewProcess = function(args){

	let callback;

	this.ensureAppValid = function(app){
		if(app.isValid()){
			this.emit("validated",app);
		} else {
			this.emit("invalid", app.validationMessage());
		}
	};

	this.findNextMission = function(app){
		app.mission = {
			commander: null,
			pilot: null,
			MAVPilot: null,
			passenger: []
		};
		this.emit("mission-selected", app);
	};

	this.roleIsAvailable = function(app){



		this.emit("role-available", app);
	};

	this.ensureRoleCompatible = function(app){



		this.emit("role-compatible", app);
	};

	this.acceptApplication = function(app){
		callback(null, {
			success: true,
			message: "Welcome to the Mars Program!"
		});
	};

	this.denyApplication = function(message){
		callback(null, {
			success: false,
			message: message
		});
	};

	this.processApplication = function(app, next){
		callback = next;
		this.emit("application-received", app);
	};

	//event path
	this.on("application-received", this.ensureAppValid);
	this.on("validated", this.findNextMission);
	this.on("mission-selected", this.roleIsAvailable);
	this.on("role-available", this.ensureRoleCompatible);
	this.on("role-compatible", this.acceptApplication);

	//sad path
	this.on("invalid", this.denyApplication);


};

util.inherits(ReviewProcess,Emitter);
module.exports = ReviewProcess;