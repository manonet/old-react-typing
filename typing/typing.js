var params = {};
var lesson, kbd, stat, statDetails;

var displayHint = function() {
	
	if (params.nextChar == " ") {
		params.nextChar = "[space]";
	}
	
	var hint = "Now write " + params.nextChar;
	
	if (params.dictating) {
		play(params.nextChar);
	}
	params.hintBox.html(hint);
};


var typing = function(charTyped) {
	
	params.signToWrite = params.sample.substring(params.userText.length, params.userText.length+1);
	params.writtenSign = charTyped;
	params.nextChar = params.sample.substring(params.userText.length+1, params.userText.length+2);
	params.cursorAt = params.userText.length;
	
	
	correction();
	
	// start of lesson
	if (params.userText.length == 1) {
		stat.startTiming();
	}
	
	// end of lesson
	if (params.sample.length == params.userText.length + 1) {
		stat.endTiming();
		stat.save();
		getLesson(params.lessonId++);
	}
	
	kbd.markKeyboard();
	displayHint();
	
	params.userText += charTyped;
}

window.onkeydown = function(e) {
	// prevent site from scrolling when hitting spacebar
	if (e.keyCode == 32 && e.target == document.body) {
		e.preventDefault();
		typing(" ");
	}
};
document.onkeypress = function(evt) {
	evt = evt || window.event;
	var charCode = evt.which || evt.keyCode;
	var charTyped = String.fromCharCode(charCode);
	typing(charTyped);
};

var correction = function() {
	params.message = "Requested: " + params.signToWrite + ", written: " + params.writtenSign + "<br/>";
	
	if (params.writtenSign == params.signToWrite) {
		// written correctly
		params.correct = true;
		params.correct_hits++;
		if(params.correct_hits_array[params.writtenSign]) {
			params.correct_hits_array[params.writtenSign]++;
		} else {
			params.correct_hits_array[params.writtenSign] = 1;
		}
		params.message += "that's correct."
		params.letters[params.cursorAt].addClass('done');
		
	} else {
		// mistake
		params.correct = false;
		params.miswrite_hits++;
		if(params.miswrite_hits_array[params.writtenSign]) {
			params.miswrite_hits_array[params.writtenSign]++;
		} else {
			params.miswrite_hits_array[params.writtenSign] = 1;
		}
		if(params.misspell_hits_array[params.signToWrite]) {
			params.misspell_hits_array[params.signToWrite]++;
		} else {
			params.misspell_hits_array[params.signToWrite] = 1;
		}
		params.message += "that's wrong."
		params.letters[params.cursorAt].addClass('error');
	}
	params.messagebox.html(params.message);
};

var createTextBoard = function(strg, arr) {
	params.textBoard.empty();
	
	for (var i = 0; i < strg.length; i++) {
		// create letter
		var letter = jQuery('<span/>', {
			id: 'letter_' + i,
			class: 'letter',
			text: strg.charAt(i)
		});
		// fill array
		arr[i] = letter;
		// append to textBoard
		letter.appendTo(params.textBoard);
	}
}

function play(text){
	var url = 'http://translate.google.com/translate_tts?tl=de&q='+text;
	var a = new Audio(url);
	a.play();
}

var detectOS = function() {
	var OSName="windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="osx";
	if (navigator.appVersion.indexOf("Android")!=-1) OSName="android";
	//if (navigator.appVersion.indexOf("Win")!=-1) OSName="windows";
	//if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
	//if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
	return OSName;
}

var detectLang = function() {
	var userLang = navigator.language || navigator.userLanguage;
	return userLang;
}

var getKeyboard = function() {
	kbd = new KeyBoard(params, params.locale, params.keyBoardContainer);
	kbd.getKeyBoard();
}

var getLesson = function(Id) {
	params.lessonURL = params.baseURL + "/index.php?option=com_typing&task=lesson&id="+Id+"&format=json",
	lesson = new Lesson(params);
	lesson.loadLesson();
	lesson.accessData().then(function(inst) {
		kbd.markKeyboard();
	});
}

var getStat = function() {
	stat = new Statistic(params);
}

var locale = detectLang().substring(0, 2) + "-t-k0-" + detectOS();
jQuery( document ).ready(function() {
	// prevent caching json files
	jQuery.ajaxSetup({ cache: false });
	
	// Create an instance
	params = {
		baseURL: baseURL, // variable taken from template index, JURI::base();
		userID: userID, // variable taken from template index
		lessonId: 1,
		lessonURL: this.baseURL + "/index.php?option=com_typing&task=lesson&id=2&format=json",
		locale: locale,
		keyboardURL: this.baseURL + "/../../typing/keyboards/" + detectOS() + "/" + locale + ".xml",
		savestatURL: this.baseURL + "/index.php?option=com_typing&task=savestat",
		userJsonURL: this.baseURL + "/../../typing/userdata/statistic/user-" + userID + ".json",
		hintBox: jQuery("#hintBox"),
		messagebox: jQuery("#messagebox"),
		textBoard: jQuery('#textBoard'),
		keyBoardContainer: jQuery("#keyBoard"),
		
		sample: "",
		signToWrite: "",
		nextChar: "",
		userText: "",
		writtenSign: "",
		cursorAt: 0,
		letters: new Array(),
		keyBoardKeys: {},
		keyBoardSigns: {},
		message: "",
		correct: false,
		dictating: false,
		
		// statistic
		correct_hits: 0,
		correct_hits_array: {},
		miswrite_hits: 0,
		miswrite_hits_array: {},
		misspell_hits_array: {},
		endurance: 0,
	}
	
	if (jQuery('#typing')[0]) {
		var init = function() {
			getLesson(params.lessonId++);
			getKeyboard();
			getStat();
		}();
	}
	
	jQuery('#get-detailed-stat').click(function(){
		statDetails = new StatisticDetails(params);
		statDetails.get();
	});
});