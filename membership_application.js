var _ = require("underscore")._;
var moment = require("moment");

var MembershipApplication = function(args){
	args || (args = {});
	_.extend(this, args);

	this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10, "days");

	this.expired = function(){
		return this.validUntil.isBefore(moment());
	};

	this.emailIsValid = function(){
		return this.email && this.email.length > 3 && this.email.indexOf("@") > -1;
	};

	this.heightIsValid = function(){
		return this.height && this.height > 60 && this.height < 75;
	};

	this.weightIsValid = function(){
		return this.weight && this.weight > 100 && this.weight < 300;
	};

	this.ageIsValid = function(){
		return this.age && this.age > 15 && this.age < 100;
	};

	this.nameIsValid = function(){
		return this.first && this.last;
	};

	this.isValid = function(){
		return this.emailIsValid() &&
				this.nameIsValid() &&
				this.heightIsValid() &&
				this.weightIsValid() &&
				this.ageIsValid() &&
				!this.expired();
	};

};

module.exports = MembershipApplication;