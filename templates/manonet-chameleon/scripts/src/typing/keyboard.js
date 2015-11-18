
function KeyBoard(params, layout, selector, signarray, variant){
	this.xmlLoadDeferred = $.Deferred();
	this.params = params;
	this.selector = selector;
	this.signarray = signarray;
	this.variant = variant;
}

KeyBoard.prototype.createKeyBoard = function(xml) {
	var self = this;
	var keyMap = 0;
	var signarray = this.signarray;
	
	this.params.keyBoardSigns = {};
	this.params.keyBoardKeys = {};
	
	var A = $('<div/>', {id: 'A'});
	var B = $('<div/>', {id: 'B'});
	var C = $('<div/>', {id: 'C'});
	var D = $('<div/>', {id: 'D'});
	var E = $('<div/>', {id: 'E'});
	E.appendTo(this.selector);
	D.appendTo(this.selector);
	C.appendTo(this.selector);
	B.appendTo(this.selector);
	A.appendTo(this.selector);
	$(A).empty();
	$(B).empty();
	$(C).empty();
	$(D).empty();
	$(E).empty();
	
	this.params.locale = $(xml).find('keyboard').attr('locale');
	
	$(xml).find('keyMap').each(function(){
		$(this).find("map").each(function(){
			var strg = $(this).attr('to');
			var iso = $(this).attr('iso');
			var key, sign;
			var mark = false;
			
			// unescape unicode
			if (strg.indexOf('\\u{') > -1) {
				strg = strg.replace("\\u{", "&#x");
				strg = strg.replace("}", ";");
			}
			if (signarray) {
				$.each(signarray, function(index, elem){
					if (index.toLowerCase() === strg.toLowerCase()) {
						mark = true;
					}
				});
			}
			
			if (keyMap == 0) {
			// create key
				key = self.createKey(iso,strg,mark);
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

KeyBoard.prototype.createKey = function(iso,strg,mark) {
	var classname = 'key';
	if (mark) {
		classname = 'key ' + this.variant;
	}
	
	// create key
	var key = $('<b/>', {
		id: iso,
		class: classname
	});
	
	// create color layer
	var background = $('<i/>');
	background.appendTo(key);
	
	
	// fill array
	this.params.keyBoardKeys[iso] = key;
	
	// append key to correct keyboard "row"
	switch(iso.substring(0,1)) {
		case 'A':
			key.appendTo(A);
			break;
		case 'B':
			key.appendTo(B);
			break;
		case 'C':
			key.appendTo(C);
			break;
		case 'D':
			key.appendTo(D);
			break;
		case 'E':
			key.appendTo(E);
			break;
	}
	return key;
};

KeyBoard.prototype.createsign = function(id,iso,strg) {
	
	// create sign
	var sign = $('<b/>', {
		class: 's s_' + id,
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
	if(this.params.userText.length > 0 && this.params.writtenSign != undefined) {
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