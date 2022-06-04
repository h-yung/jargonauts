const express = require('express')
const app = express()
const cors = require('cors')
const PORT=8000

app.use(cors())

/* the object **************/ 
const jargon = {
    'tone': {
        'diplomatic': ['Keep me honest here.',],
        'sympathetic': ['It\'s the nature of the beast.'],
        'motivational': ['The prize for winning a pie-eating contest is more pie.','There\'s a lot of opportunity in this space.'],
        'neutral' : ['This could have been an email'],
        'cautionary': ['Let\'s not boil the ocean.', 'But what\'s the value add here?']
    },
    'dictionary': { 
        'mece': 'MECE: Mutually exclusive, collectively exhaustive - describing thorough coverage of an area of market research or problem space',
        'bandwidth': 'Bandwidth: Mythical time and energy available for each person to do more',
        'resourcing': 'Resourcing: Assigning hours to someone\'s day so that their day exceeds 24 hours.',
        'synergistic': 'Synergistic: Work well together, like the 15 minutes of overlapping free time in two calendars.',
        'circle back': 'Circle back: Return to a subject',
        'leverage': 'Leverage: to use',
    },
    'tips': [
        'Replace all uses of the word "use" with "leverage". Conjugate accordingly.',
        'Assess, analyze, ideate, strategize, generate, and drive stakeholder alignment.',
        'Nominalization is your friend. Turn every verb into a noun, preferably with more than three syllables.',
        'Don\'t just do it. Instead, conduct, implement, operationalize, or best of all, drive operationalization of it.',
        'Use adjectives like they\'re nouns - if you say it with conviction, it will make sense to the whole team. Try: "creative."'
    ],
    'not found': ['Not found; please try again.'],
}

/*********************** */

app.get('/', (req,res) => {
    res.sendFile(__dirname +'/index.html') //change html after heroku
})

app.get('/api/:type', (req,res)=> {
    const resourceType = req.params.type.toLowerCase()
    console.log(resourceType)
    if (resourceType === 'jargon'){
        console.log('Please specify resource type.')
        res.json(jargon)
    } else if (jargon[resourceType]){
        res.json(jargon[resourceType])
    }else (
        res.json( jargon['not found'][0])
    )
})

app.listen(PORT, ()=> {
    console.log(`Server now running on port ${PORT}`)
})