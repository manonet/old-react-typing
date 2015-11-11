
function KeyBoard(params){
	this.xmlLoadDeferred = $.Deferred();	
	this.params = params;
}

KeyBoard.prototype.createKeyBoard = function(xml) {
	var self = this;
	var keyMap = 0;
	
	this.params.keyBoardSigns = {};
	this.params.keyBoardKeys = {};
	this.params.A.empty();
	this.params.B.empty();
	this.params.C.empty();
	this.params.D.empty();
	this.params.E.empty();
	
	
	$(xml).find('keyMap').each(function(){
			
		$(this).find("map").each(function(){
			var strg = $(this).attr('to');
			var iso = $(this).attr('iso');
			var key, sign;
			
			// unescape unicode
			if (strg.indexOf('\\u{') > -1) {
				strg = strg.replace("\\u{", "&#x");
				strg = strg.replace("}", ";");
			}
			
			if (keyMap == 0) {
			// create key
				key = self.createKey(iso,strg);
			}
			
			// display only unique signs
			if (self.params.keyBoardSigns[strg] == undefined && /[^a-z]/.test(strg)) {
				sign = self.createsign(keyMap,iso,strg);
			}
			self.params.keyBoardSigns[strg] = new Array(iso, self.params.keyBoardKeys[iso]);
		});
		keyMap ++;
	});
	
	//console.log(this.params.keyBoardKeys);
	//console.log(this.params.keyBoardSigns);
};

KeyBoard.prototype.createKey = function(iso,strg) {
	
	// create key
	var key = jQuery('<span/>', {
		id: iso,
		class: 'key'
	});
	// fill array
	this.params.keyBoardKeys[iso] = key;
	
	// append key to correct keyboard "row"
	switch(iso.substring(0,1)) {
		case 'A':
			key.appendTo(this.params.A);
			break;
		case 'B':
			key.appendTo(this.params.B);
			break;
		case 'C':
			key.appendTo(this.params.C);
			break;
		case 'D':
			key.appendTo(this.params.D);
			break;
		case 'E':
			key.appendTo(this.params.E);
			break;
	}
	return key;
};

KeyBoard.prototype.createsign = function(id,iso,strg) {
	
	// create sign
	var sign = jQuery('<span/>', {
		class: 'sign sign_' + id,
		html: strg
	});
	
	// append to textBoard
	
	sign.appendTo(this.params.keyBoardKeys[iso]);
	
	return sign;
};

KeyBoard.prototype.markKeyboard = function() {
	for (var key in this.params.keyBoardKeys) {
		this.params.keyBoardKeys[key].removeClass('toHit');
	}
	if (this.params.keyBoardSigns[this.params.nextChar]) {
		this.params.keyBoardSigns[this.params.nextChar][1].addClass('toHit');
	}
	if(this.params.userText.length > 0) {
		if (this.params.correct) {
			this.params.keyBoardSigns[this.params.writtenSign][1].addClass('correct');
		} else {
			this.params.keyBoardSigns[this.params.writtenSign][1].addClass('error');
		}
	}
};

KeyBoard.prototype.getKeyBoard = function() {
	var self = this;
	var kbdUrl = this.params.keyboardURL;
	$.ajax({
		url: kbdUrl,
		success: function(xml){
			self.xml = xml;
			self.xmlLoadDeferred.resolveWith(self);
			
			self.createKeyBoard(xml);
		},
		error: function (textStatus, errorThrown) {
			console.log('getting keyboard failed');
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
};

KeyBoard.prototype.accessXml = function() {
    return this.xmlLoadDeferred.promise();
};