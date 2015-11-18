function StatisticDetails(params){
	this.dataLoadDeferred = $.Deferred();
	this.params = params;
};

StatisticDetails.prototype.get = function() {
	var myarray = {};
	var self = this;
	var statUrl = this.params.userJsonURL;
	$.getJSON( statUrl, function( data ) {
		$.each(data['en-t-k0-windows']['2015-11-17']['correct'], function (name, value) {
		myarray[name] = value;
			//console.log('name: ' + name + ', value:' + value );
		});
	});
	//console.log(myarray);
	
	var statkbd = new KeyBoard(params, params.locale, $('.stat-keyboard'), myarray, 'correct');
	statkbd.getKeyBoard();
};

StatisticDetails.prototype.accessData = function() {
    return this.dataLoadDeferred.promise();
};