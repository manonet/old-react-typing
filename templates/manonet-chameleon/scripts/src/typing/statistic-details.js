function StatisticDetails(params){
	this.dataLoadDeferred = $.Deferred();
	this.params = params;
};

StatisticDetails.prototype.get = function() {
	
	console.log('StatisticDetails');
	var self = this;
	var statUrl = this.params.userJsonURL;
	$.getJSON( statUrl, function( data ) {
		$( "<p/>", {
			"class": "my-new-list",
			html: JSON.stringify(data)
		}).appendTo( "#statistic-details" );
	});
};

StatisticDetails.prototype.accessData = function() {
    return this.dataLoadDeferred.promise();
};