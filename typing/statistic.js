
function Statistic(params){
	this.dataLoadDeferred = jQuery.Deferred();	
	this.params = params;
	this.startTime = 0;
	this.endTime = 0;
	this.endurance = 0;
}

Statistic.prototype.save = function() {
	var self = this;
	var statUrl = this.params.savestatURL;
	var data = {
		'locale' : this.params.locale,
		'correct_hits' : this.params.correct_hits,
		'miswrite_hits' : this.params.miswrite_hits,
		'endurance' : this.endurance,
		'correct_hits_array' : JSON.stringify(this.params.correct_hits_array),
		'miswrite_hits_array' : JSON.stringify(this.params.miswrite_hits_array),
		'misspell_hits_array' : JSON.stringify(this.params.misspell_hits_array)
	};
	//console.log(this.params.locale);
	jQuery.ajax({
		type: "POST",
		url: statUrl,
		data: data,
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