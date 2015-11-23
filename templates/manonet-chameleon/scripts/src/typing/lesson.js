
function Lesson(params){
	this.dataLoadDeferred = jQuery.Deferred();	
	this.params = params;
}

Lesson.prototype.loadLesson = function() {
	var self = this;
	var lsUrl = this.params.lessonURL;
	jQuery.ajax({
		url: lsUrl,
		success: function(data){
			self.data = data;
			
			// reset all property
			self.params.userText = "";
			self.params.writtenSign = "";
			self.params.cursorAt = 0;
			self.params.letters = new Array();
			
			// use loaded data
			self.params.sample = data[0].content;
			self.params.signToWrite = self.params.sample.substring(0, 1);
			self.params.nextChar = self.params.signToWrite;
			
			createTextBoard(self.params.sample,self.params.letters);
			displayHint();
			
			self.dataLoadDeferred.resolveWith(self);
		}
	});
};

Lesson.prototype.accessData = function() {
    return this.dataLoadDeferred.promise();
};