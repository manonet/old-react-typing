jQuery(function() {
	document.formvalidator.setHandler('lesson', function (value) {
		regex=/^[^0-9]+$/;
		return regex.test(value);
	});
});