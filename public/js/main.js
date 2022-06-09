
// make sections visible or not
document.querySelector('a[data-action="startMsg"]').addEventListener('click', function(){showSection('#generator')})
document.querySelector('a[data-action="goAbout"]').addEventListener('click', function(){showSection('#about')})
document.querySelector('footer h3').addEventListener('click', function(){showSection('#creds')})

function showSection(selector){
    document.querySelector(selector).classList.toggle('hidden')
}

// reveal recommended sentence
document.querySelector('form[data-type="tonal"]').addEventListener('submit', function(event){
    event.preventDefault();
    getPhrase();
})

// copies to clipboard on click
let copy;
let messagePrinted = document.querySelector('p[data-content="messageBody"]')

document.querySelector('p[data-content="messageBody"]').addEventListener('click', function(){
    copy = messagePrinted.innerText;
    navigator.clipboard.writeText(copy);
})

/*async*/ function getPhrase(){ 
    let tonalChoice = document.querySelector('select[data-type="tone"]').value
    if (tonalChoice !== "tone of choice"){
        fetch(`/tone/${tonalChoice}`, {
            method: "get",
            headers: { "Content-Type": "application/json"},
        })
            .then(res => {
                if (res.ok) return res.json()
                document.querySelector('#phrase').classList.remove('hidden');
            })
            // .then(response => {
            //     //do something with the response?
            //     console.log(response)
            // })
            .catch(err=>console.log(err))
    }else {
        document.querySelector('#phrase').classList.add('hidden');
    }


    // try {
    //     const res = await fetch('https://jargonauts-api.herokuapp.com/api/tone')
    //     const data = await res.json()
    //     let tonalChoice = document.querySelector('select[data-type="tone"]').value
    //     if (tonalChoice !== "tone of choice"){
    //         messagePrinted.textContent = data[tonalChoice][Math.floor(Math.random()*data[tonalChoice].length)]
    //         document.querySelector('#phrase').classList.remove('hidden');
    //     }else {
    //         document.querySelector('#phrase').classList.add('hidden');
    //     }
    // }catch(error){
    //     console.log(error)
    // }
    // document.querySelector('#generator').classList.add('hidden')
}

//space for audio - hear read aloud. remove default action of submit. 
document.querySelector('#audible').addEventListener('click', readAloud)

function readAloud(){
    let synth = window.speechSynthesis;
    let audibleJargon = new SpeechSynthesisUtterance(messagePrinted.innerText);
    synth.speak(audibleJargon);
}
// styling- if #generator does not have class .hidden, remove border from nav item

// dictionary
let dictionary;
let dictionaryList;
let tempHolder= document.querySelector('#holder')  //currently no tab available
let searchBox = document.querySelector('#wordPhrase')
let guess;
let searchResult = document.querySelector('#searchResult')
let definition = document.querySelector('#definition')

let sendWord = document.querySelector('#sendWord') //button

async function getDictionary(){ //is async - using fetch for now
    try {
        searchBox.value = ""// also reset search bar for each pg refresh
        let response = await fetch('https://jargonauts-api.herokuapp.com/api/dictionary')
        let results = await response.json()
        dictionary = results;
        dictionaryList = Object.keys(dictionary);
    }catch(error){
        console.log(error)
    }
}

function guessInput() {
    let wipWord = searchBox.value.toLowerCase()
    if (wipWord.length < 1) return; //exit if empty
    else {
        if (dictionary === undefined || dictionaryList === undefined) getDictionary();
        guess = dictionaryList.find(word => word.slice(0,wipWord.length) === wipWord)
    }
}

function giveResult(){
    let thingToFind = searchBox.value.toLowerCase()
        if (thingToFind.length === 0){
            searchResult.textContent = ""
            definition.textContent = ""
        }else if (dictionary[thingToFind]){
            searchResult.textContent = thingToFind
            definition.textContent = dictionary[thingToFind]
            definition.classList.remove('clickMe')
            definition.removeAttribute('title')
        }else {
            if (guess !== undefined){
                searchResult.textContent = ""
                definition.textContent = `Did you mean to look up "${guess}"?`
                definition.classList.add('clickMe')
                definition.setAttribute('title', 'Go to definition')
                definition.addEventListener('click', function(){
                    searchBox.value = guess;
                    giveResult();
                })
            }else {
                searchResult.textContent = ""
                definition.textContent = dictionary['not found']
            }
        }
}

getDictionary(); //populate on pageload
searchBox.addEventListener('input', guessInput)
sendWord.addEventListener('click', giveResult)
document.querySelector('#lookup').addEventListener('submit', function(e){e.preventDefault(); giveResult})


// add new things
const addStuff = document.querySelector('#newSub')
addStuff.addEventListener('submit', function(e){e.preventDefault(); extendResource()})
addStuff.addEventListener('click', extendResource)


// selective sub reveal - to also limit database doc properties
const categoryPicker = document.querySelector('select[data-type="resourceType"]')
categoryPicker.addEventListener('change', showSubs)

const passcode = document.querySelector('#passcode').value 
let category;

// for avoidance of error issues
let term;
let newDef;
let toneOption;
let inspo;
let tip;

function showSubs(){
    document.querySelectorAll('fieldset').forEach(element => element.classList.add('hidden')) //hide irrelevant sets
    category = categoryPicker.value
    document.querySelectorAll(`fieldset:not([data-type="${category}"])`).forEach(element => element.querySelectorAll('input').forEach(element => element.value = ""))
    document.querySelector(`fieldset[data-type='${category}']`).classList.remove('hidden')
    document.querySelector('#newSub').classList.remove('hidden')  
}

function extendResource(){
    category = categoryPicker.value //reassign in case not initiated
    document.querySelectorAll(`fieldset:not([data-type="${category}"])`).forEach(element => element.querySelectorAll('input').forEach(element => element.removeAttribute('name')))
    if (category === 'tone'){
        toneOption = document.querySelector('input[name="toneOption"]').value
        inspo = document.querySelector('input[name="inspo"]').value
        fetch('/jargon', {
            method:'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                category,
                toneOption,
                inspo,
            })
        })
        .catch(err => console.log(err))
    }else if (category === 'dictionary'){
        term = document.querySelector('input[name="term"]').value
        newDef = document.querySelector('input[name="newDef"]').value
        fetch('/jargon', {
            method:'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                category, 
                term,
                newDef,
            })
        })
        .catch(err => console.log(err))
    }else if (category === 'tips'){
        tip = document.querySelector('input[name="tip"]').value
        fetch('/jargon', {
            method:'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                category,
                tip
            })
        })
        .catch(err => console.log(err))
    }
}