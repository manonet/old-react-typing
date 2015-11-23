function StatisticDetails(params){
	this.dataLoadDeferred = jQuery.Deferred();
	this.params = params;
};

StatisticDetails.prototype.get = function() {
	var self = this;
	var statUrl = this.params.userJsonURL;
	jQuery.getJSON( statUrl, function( data ) {
		var statkbd = new KeyBoard(params, params.locale, jQuery('.stat-keyboard'));
		statkbd.getKeyBoard('statistic', data);
	});
	
};

StatisticDetails.prototype.accessData = function() {
    return this.dataLoadDeferred.promise();
};