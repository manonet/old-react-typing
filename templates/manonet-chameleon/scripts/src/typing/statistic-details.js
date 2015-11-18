function StatisticDetails(params){
	this.dataLoadDeferred = $.Deferred();
	this.params = params;
};

StatisticDetails.prototype.get = function() {
	var self = this;
	var statUrl = this.params.userJsonURL;
	$.getJSON( statUrl, function( data ) {
		var statkbd = new KeyBoard(params, params.locale, $('.stat-keyboard'));
		statkbd.getKeyBoard('statistic', data);
	});
	
};

StatisticDetails.prototype.accessData = function() {
    return this.dataLoadDeferred.promise();
};