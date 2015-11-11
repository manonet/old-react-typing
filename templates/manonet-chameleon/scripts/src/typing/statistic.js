
function Statistic(params){
	this.dataLoadDeferred = $.Deferred();	
	this.params = params;
	this.startTime = 0;
	this.endTime = 0;
	this.endurance = 0;
}

Statistic.prototype.save = function() {
	var self = this;
	var statUrl = this.params.savestatURL +
	'&correct_hits=' + this.params.correct_hits +
	'&miswrite_hits=' + this.params.miswrite_hits +
	'&endurance=' + this.endurance;
	$.ajax({
		url: statUrl,
		success: function(data){
			self.data = data;
			self.dataLoadDeferred.resolveWith(self);
		}
	});
};

Statistic.prototype.startTiming = function() {
	this.startTime = new Date();
}

Statistic.prototype.endTiming = function() {
	this.endTime = new Date();
	this.endurance += this.endTime - this.startTime;
}

Statistic.prototype.accessData = function() {
    return this.dataLoadDeferred.promise();
};