var clicked = false;
var error_used = false;
var language = "english";

LANGUAGES = {
    'af': 'afrikaans',
    'sq': 'albanian',
    'am': 'amharic',
    'ar': 'arabic',
    'hy': 'armenian',
    'az': 'azerbaijani',
    'eu': 'basque',
    'be': 'belarusian',
    'bn': 'bengali',
    'bs': 'bosnian',
    'bg': 'bulgarian',
    'ca': 'catalan',
    'ceb': 'cebuano',
    'ny': 'chichewa',
    'zh-cn': 'chinese (simplified)',
    'zh-tw': 'chinese (traditional)',
    'co': 'corsican',
    'hr': 'croatian',
    'cs': 'czech',
    'da': 'danish',
    'nl': 'dutch',
    'en': 'english',
    'eo': 'esperanto',
    'et': 'estonian',
    'tl': 'filipino',
    'fi': 'finnish',
    'fr': 'french',
    'fy': 'frisian',
    'gl': 'galician',
    'ka': 'georgian',
    'de': 'german',
    'el': 'greek',
    'gu': 'gujarati',
    'ht': 'haitian creole',
    'ha': 'hausa',
    'haw': 'hawaiian',
    'iw': 'hebrew',
    'hi': 'hindi',
    'hmn': 'hmong',
    'hu': 'hungarian',
    'is': 'icelandic',
    'ig': 'igbo',
    'id': 'indonesian',
    'ga': 'irish',
    'it': 'italian',
    'ja': 'japanese',
    'jw': 'javanese',
    'kn': 'kannada',
    'kk': 'kazakh',
    'km': 'khmer',
    'ko': 'korean',
    'ku': 'kurdish (kurmanji)',
    'ky': 'kyrgyz',
    'lo': 'lao',
    'la': 'latin',
    'lv': 'latvian',
    'lt': 'lithuanian',
    'lb': 'luxembourgish',
    'mk': 'macedonian',
    'mg': 'malagasy',
    'ms': 'malay',
    'ml': 'malayalam',
    'mt': 'maltese',
    'mi': 'maori',
    'mr': 'marathi',
    'mn': 'mongolian',
    'my': 'myanmar (burmese)',
    'ne': 'nepali',
    'no': 'norwegian',
    'ps': 'pashto',
    'fa': 'persian',
    'pl': 'polish',
    'pt': 'portuguese',
    'pa': 'punjabi',
    'ro': 'romanian',
    'ru': 'russian',
    'sm': 'samoan',
    'gd': 'scots gaelic',
    'sr': 'serbian',
    'st': 'sesotho',
    'sn': 'shona',
    'sd': 'sindhi',
    'si': 'sinhala',
    'sk': 'slovak',
    'sl': 'slovenian',
    'so': 'somali',
    'es': 'spanish',
    'su': 'sundanese',
    'sw': 'swahili',
    'sv': 'swedish',
    'tg': 'tajik',
    'ta': 'tamil',
    'te': 'telugu',
    'th': 'thai',
    'tr': 'turkish',
    'uk': 'ukrainian',
    'ur': 'urdu',
    'uz': 'uzbek',
    'vi': 'vietnamese',
    'cy': 'welsh',
    'xh': 'xhosa',
    'yi': 'yiddish',
    'yo': 'yoruba',
    'zu': 'zulu',
}
LANGCODES = {};

for (var key in LANGUAGES) {
		LANGCODES[LANGUAGES[key]] = key;
}

$(document).on("click", ".dropdown-menu li", function(){
    language = $(this).text();
	language = language.toLowerCase();
});


$(document).on("click", "#start", function(){
  alert("clicked");
  if (!clicked) {
    clicked = true
    evtSrc.close();
	evtSrc = new EventSource("/chatData/False");
  }
  else {
    evtSrc.close();
    evtSrc = new EventSource("/chatData/True");
    clicked = false;
	error_used = false;
  }
  // $.ajax({
  //   type: "GET",
  //   url: "/language/" + $(this).text(),
  //   success: function(data) {
  //     alert(data);
  //   },
  // });
});

var evtSrc = new EventSource("/chatData/True");

evtSrc.onmessage = function(e) {
	var previousText = $(".chatText").html();
	var new_text = null;
	if (!error_used && e.data == "Error"){
		new_text = "Oops! Didn't catch that!";
		error_used = true;
	}
	else if (e.data != "Error"){
		new_text = e.data;
	}
	if (language != "english") {
		$.ajax({
			type: "POST",
			async: false,
			url: "https://translation.googleapis.com/language/translate/v2?key=AIzaSyDxiGf43dZ_7t4T76b6ZFF8_qwL94ELv8o",
			data: JSON.stringify({'q': new_text, 'target': LANGCODES[language]}),
			contentType: "application/json",
			success: function(data) {
				new_text = data.data.translations[0].translatedText;
			},
		});
	}

	$(".chatText").html(previousText + "<br>" + new_text);
  
}
