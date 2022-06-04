const express = require('express')
const app = express()
const cors = require('cors')
const PORT=8000

app.use(cors())

/* the object **************/ 
const jargon = {
    'tone': {
        'diplomatic': ['Keep me honest here.','At the end of the day, we don\'t have enough boots on the ground and just need to show we did our due diligence.'],
        'sympathetic': ['It\'s the nature of the beast.',],
        'motivational': ['The prize for winning a pie-eating contest is more pie.','There\'s a lot of opportunity in this space.', 'We\'ll have the ballpark figures by COB and the full report ready in the AM.'],
        'provocative' : ['This could have been an email'],
        'cautionary': ['Let\'s not boil the ocean.', 'But what\'s the value add here?']
    },
    'dictionary': { 
        'mece': '(MECE) Mutually exclusive, collectively exhaustive - describing thorough coverage of an area of market research or problem space',
        'bandwidth': 'bandwidth: Mythical time and energy available for each person to do more',
        'resourcing': 'assigning hours to someone\'s day so that their day exceeds 24 hours.',
        'synergistic': 'work well together, like the 15 minutes of overlapping free time in two calendars.',
        'circle back': 'return to a subject',
        'leverage': 'to use',
        'land the plane on': 'agree on or bring to a conclusion; confirm definitively (or more definitively than previous state)',
        'deliverables': 'the stuff you work on that the client wants and the contract describes. Compare: "jawn".',
        'pushback': 'resistance, objection to what is being presented',
        'okr': '(OKR) Objectives and Key Results - part of a respectable management strategy',
        'kpi': '(KPI) Key Performance Indicator - type of data point you care about because they might symbolize progress in a desired direction',
    },
    'tips': [
        'Replace all uses of the word "use" with "leverage". Conjugate accordingly.',
        'Assess, analyze, ideate, strategize, generate, and drive stakeholder alignment.',
        'Nominalization is your friend. Turn every verb into a noun, preferably with more than three syllables.',
        'Don\'t just do it. Conduct, implement, operationalize, or best of all, drive operationalization of it.',
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

app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Server now running on port ${PORT}`)
})