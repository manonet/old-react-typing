var params = {};
var lesson, kbd, stat;

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

document.onkeypress = function(evt) {
	evt = evt || window.event;
	var charCode = evt.which || evt.keyCode;
	var charTyped = String.fromCharCode(charCode);
	
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
};

var correction = function() {
	params.message = "Requested: " + params.signToWrite + ", written: " + params.writtenSign + "<br/>";
	
	if (params.writtenSign == params.signToWrite) {
		// written correctly
		params.correct = true;
		params.correct_hits++;
		params.message += "that's correct."
		params.letters[params.cursorAt].addClass('done');
		
	} else {
		// mistake
		params.correct = false;
		params.miswrite_hits++;
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
	params.keyboardURL = params.baseURL + "/typing/keyboards/" + detectOS() + "/" + detectLang().substring(0, 2) + "-t-k0-" + detectOS() + ".xml";
	
	kbd = new KeyBoard(params);
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


$( document ).ready(function() {
	// Create an instance
	params = {
		baseURL: "//webroot/m5/public_html",
		lessonId: 1,
		lessonURL: this.baseURL + "/index.php?option=com_typing&task=lesson&id=2&format=json",
		keyboardURL: this.baseURL + "/components/com_typing/views/typing/hu-t-k0-windows.xml",
		savestatURL: this.baseURL + "/index.php?option=com_typing&task=savestat",
		hintBox: $("#hintBox"),
		messagebox: $("#messagebox"),
		textBoard: $('#textBoard'),
		keyBoardContainer: $("#keyBoard"),
		A: $("#A"),
		B: $("#B"),
		C: $("#C"),
		D: $("#D"),
		E: $("#E"),
		
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
		miswrite_hits: 0,
		endurance: 0,
	}
	
	var init = function() {
		getLesson(params.lessonId++);
		getKeyboard();
		getStat();
	}();
	
});