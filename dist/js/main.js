// output from fetch
async function getTip() {
	const url = "/.netlify/functions/getOneTip?";
	try {
		const res = await fetch(url);
		const data = await res.json();

		document.querySelector('p[data-output="proTip"]').textContent =
			data.tip;
	} catch (error) {
		console.log(error);
	}
}
getTip();

// make sections visible or not
document
	.querySelector('a[data-action="startMsg"]')
	.addEventListener("click", function () {
		showSection("#generator");
	});
document
	.querySelector('a[data-action="goAbout"]')
	.addEventListener("click", function () {
		showSection("#about");
	});
document.querySelector("footer h3").addEventListener("click", function () {
	showSection("#creds");
});

function showSection(selector) {
	document.querySelector(selector).classList.toggle("hidden");
}

// reveal recommended sentence
document
	.querySelector('form[data-type="tonal"]')
	.addEventListener("submit", function (event) {
		event.preventDefault();
		getPhrase();
	});

// copies to clipboard on click
let copy;
let messagePrinted = document.querySelector('p[data-content="messageBody"]');

document
	.querySelector('p[data-content="messageBody"]')
	.addEventListener("click", function () {
		copy = messagePrinted.innerText;
		navigator.clipboard.writeText(copy);
	});

async function getPhrase() {
	let tonalChoice = document.querySelector('select[data-type="tone"]').value;
	const url = "/.netlify/functions/getOnePhrase";
	try {
		const res = await fetch(url);
		const data = await res.json();

		if (tonalChoice !== "tone of choice") {
			messagePrinted.textContent = data.inspo;
			document.querySelector("#phrase").classList.remove("hidden");
		} else {
			document.querySelector("#phrase").classList.add("hidden");
		}
	} catch (error) {
		console.log(error);
	}
	// document.querySelector('#generator').classList.add('hidden')
}

//space for audio - hear read aloud. remove default action of submit.
document.querySelector("#audible").addEventListener("click", readAloud);

function readAloud() {
	let synth = window.speechSynthesis;
	let audibleJargon = new SpeechSynthesisUtterance(messagePrinted.innerText);
	synth.speak(audibleJargon);
}
// styling- if #generator does not have class .hidden, remove border from nav item

// dictionary
let dictionary;
let dictionaryList;
let tempHolder = document.querySelector("#holder"); //currently no tab available
let searchBox = document.querySelector("#wordPhrase");
let guess;
let searchResult = document.querySelector("#searchResult");
let definition = document.querySelector("#definition");

let sendWord = document.querySelector("#sendWord"); //button

async function getDictionary() {
	//is async - using fetch for now
	try {
		// searchBox.value = ""; // also reset search bar for each pg refresh
		const url = "/.netlify/functions/getDictionary";
		let response = await fetch(url);
		let results = await response.json();
		dictionary = results;

		for (const result of results) {
			dictionary[result.term] = result.newDef;
		}
		dictionaryList = Object.keys(dictionary);
		console.log("dictionary", dictionary);
	} catch (error) {
		console.log(error);
	}
}

function guessInput() {
	let wipWord = searchBox.value.toLowerCase();
	if (wipWord.length < 1) return; //exit if empty
	else {
		if (dictionary === undefined || dictionaryList === undefined)
			getDictionary();
		guess = dictionaryList.find(
			(word) => word.slice(0, wipWord.length) === wipWord
		);
	}
}

function giveResult() {
	let thingToFind = searchBox.value.toLowerCase();
	if (thingToFind.length === 0) {
		searchResult.textContent = "";
		definition.textContent = "";
	} else if (dictionary[thingToFind]) {
		searchResult.textContent = thingToFind;
		definition.textContent = dictionary[thingToFind];
		definition.classList.remove("clickMe");
		definition.removeAttribute("title");
	} else {
		if (guess !== undefined) {
			searchResult.textContent = "";
			definition.textContent = `Did you mean to look up "${guess}"?`;
			definition.classList.add("clickMe");
			definition.setAttribute("title", "Go to definition");
			definition.addEventListener("click", function () {
				searchBox.value = guess;
				giveResult();
			});
		} else {
			searchResult.textContent = "";
			definition.textContent = dictionary["not found"];
		}
	}
}

getDictionary(); //populate on pageload
searchBox.addEventListener("input", guessInput);
sendWord.addEventListener("click", giveResult);
document.querySelector("#lookup").addEventListener("submit", function (e) {
	e.preventDefault();
	giveResult;
});
