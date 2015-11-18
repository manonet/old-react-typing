
function KeyBoard(params, layout, selector){
	this.xmlLoadDeferred = $.Deferred();
	this.params = params;
	this.selector = selector;
}

KeyBoard.prototype.createKeyBoard = function(xml) {
	var self = this;
	var keyMap = 0;
	
	this.params.keyBoardSigns = {};
	this.params.keyBoardKeys = {};
	
	// creating rows
	$(this.selector).empty();
	var A = $('<div/>', {id: 'A'});
	var B = $('<div/>', {id: 'B'});
	var C = $('<div/>', {id: 'C'});
	var D = $('<div/>', {id: 'D'});
	var E = $('<div/>', {id: 'E'});
	var rows = [E,D,C,B,A];
	this.selector.append(rows);
	
	this.params.locale = $(xml).find('keyboard').attr('locale');
	
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
	var key = $('<b/>', {
		id: iso,
		class: 'key'
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

KeyBoard.prototype.cteateHotmap = function(data) {
	var signarray = {};
	var locale = this.params.locale;
	var date = today;
	var classname = 'correct';
	
	if (!data[locale]) {
		// if locale not exist, take it from user.json
		locale = Object.getOwnPropertyNames(data)[0];
	}
	console.log(locale);
	$.each(data[locale][date][classname], function (name, value) {
		signarray[name] = value;
		console.log('name: ' + name + ', value:' + value );
	});
	$.each(this.params.keyBoardSigns, function(i,e) {
		$.each(signarray, function(index, elem){
			if(e[1].text().toLowerCase().indexOf(index.toLowerCase()) > -1) {
				e[1].addClass(classname);
			}
		});
	});
};


KeyBoard.prototype.getKeyBoard = function(purpose, data) {
	// purpose is type of keyboard, eg.: 'statistic'
	// data is a json, contains unicode characters with number values
	var self = this;
	var kbdUrl = this.params.keyboardURL;
	$.ajax({
		url: kbdUrl,
		success: function(xml){
			self.xml = xml;
			self.xmlLoadDeferred.resolveWith(self);
			
			self.createKeyBoard(xml);
			
			if (purpose === 'statistic') {
				self.cteateHotmap(data);
			}
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