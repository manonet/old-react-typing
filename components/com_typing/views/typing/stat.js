
function Statistic(params){
	this.dataLoadDeferred = $.Deferred();	
	this.params = params;
}

Statistic.prototype.save = function() {
	var self = this;
	var statUrl = this.params.savestatURL;
	$.ajax({
		url: statUrl,
		success: function(data){
			self.data = data;
			self.dataLoadDeferred.resolveWith(self);
		}
	});
};

Statistic.prototype.accessData = function() {
    return this.dataLoadDeferred.promise();
};