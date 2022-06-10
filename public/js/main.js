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

async function getPhrase(){ 
    let tonalChoice = document.querySelector('select[data-type="tone"]').value
    try {
        // const res = await fetch('https://jargonauts-api.herokuapp.com/api/tone')
        const res = await fetch(`/tone/${tonalChoice}`)
        const data = await res.json()
        if (tonalChoice !== "tone of choice"){
            document.querySelector('#phrase').classList.remove('hidden');
            let index = Math.floor(Math.random()*data.length)
            messagePrinted.textContent = data[index].inspo
        }else {
            document.querySelector('#phrase').classList.add('hidden');
        }
    }catch(error){
        console.log(error)
    }
}

//audio - hear read aloud 
document.querySelector('#audible').addEventListener('click', readAloud)

function readAloud(){
    let synth = window.speechSynthesis;
    let audibleJargon = new SpeechSynthesisUtterance(messagePrinted.innerText);
    synth.speak(audibleJargon);
}

// dictionary
const dictionary = [];
const dictionaryList = [];
let tempHolder= document.querySelector('#holder')  //currently no tab available
let searchBox = document.querySelector('#wordPhrase')
let guess;
let searchResult = document.querySelector('#searchResult')
let definition = document.querySelector('#definition')

let sendWord = document.querySelector('#sendWord') //button

// on load, retrieve dictionary for faster lookup?
async function getDictionary(){ 
    try {
        searchBox.value = ""// also reset search bar for each pg refresh
        let response = await fetch('/dictionary')
        let results = await response.json()
        for (let i=0; i<results.length; i++){
            dictionary.push({word: results[i].term, definition: results[i].newDef})
            dictionaryList.push(results[i].term)
        }
    }catch(error){
        console.log(error)
    }
}

function guessInput() {
    let wipWord = searchBox.value.toLowerCase()
    if (wipWord.length < 1) return; //exit if empty
    else {
        guess = dictionaryList.find(word => word.slice(0,wipWord.length) === wipWord)
    }
}

function giveResult(){
    let thingToFind = searchBox.value.toLowerCase()
        if (thingToFind.length === 0){
            searchResult.textContent = ""
            definition.textContent = ""
        }else {
            // look for thingToFind in the dictionary array
            if (dictionaryList.includes(thingToFind)){
                // if found, update placeholders
                let answer = dictionary.find(obj => obj.word === thingToFind)
                searchResult.textContent = thingToFind
                definition.textContent = answer.definition
                definition.classList.remove('clickMe')
                definition.removeAttribute('title') //undo link
            } else if (guess !== undefined){
                // if not found, check guess and return guess with clickthrough link
                searchResult.textContent = ""
                definition.textContent = `Did you mean to look up "${guess}"?`
                definition.classList.add('clickMe')
                definition.setAttribute('title', 'Go to definition')
                definition.addEventListener('click', function(){
                    searchBox.value = guess;
                    giveResult();
                })
            } else {
                // if no guess and not found, return a not found and format
                searchResult.textContent = ""
                definition.textContent = dictionary.find(obj=> obj.word === 'not found').definition
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

function showSubs(){
    document.querySelectorAll('fieldset').forEach(element => element.classList.add('hidden')) //hide irrelevant sets
    let category = categoryPicker.value
    document.querySelectorAll(`fieldset:not([data-type="${category}"])`).forEach(element => element.querySelectorAll('input').forEach(element => element.value = ""))
    document.querySelector(`fieldset[data-type='${category}']`).classList.remove('hidden')
    document.querySelector('#newSub').classList.remove('hidden')  
}

function extendResource(){
    let category = categoryPicker.value 
    document.querySelectorAll(`fieldset:not([data-type="${category}"])`).forEach(element => element.querySelectorAll('input').forEach(element => element.removeAttribute('name')))
    if (category === 'tone'){
        let toneOption = document.querySelector('input[name="toneOption"]').value
        let inspo = document.querySelector('input[name="inspo"]').value
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
        let term = document.querySelector('input[name="term"]').value
        let newDef = document.querySelector('input[name="newDef"]').value
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
        let tip = document.querySelector('input[name="tip"]').value
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