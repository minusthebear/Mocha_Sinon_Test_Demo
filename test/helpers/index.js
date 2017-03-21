const MembershipApplication = require("../../models/membership_application");
const sinon = require("sinon");
const DB = require("../../db");
const Mission = require("../../models/mission");
/*
sinon.stub(db, "getMissionByLaunchDate").yields(null, null);
sinon.stub(db, "createNextMission").yields(null, new Mission());
const missionControl = new MissionControl({ db: db });
*/
exports.validApplication = new MembershipApplication({
	first: "Test",
	last: "User",
	email: "test@test.com",
	age: 30,
	height: 66,
	weight: 180
});

exports.stubDb = function(args){
	args = (args = {});
	let mission = args.mission || new Mission();
	let db = new DB();
	sinon.stub(db, "getMissionByLaunchDate").yields(null,null);
	sinon.stub(db, "createNextMission").yields(null, mission);
	return db;
};