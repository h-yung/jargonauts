const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const req = require('express/lib/request')
const PORT= process.env.PORT || 8000
const dotenv = require('dotenv')
dotenv.config()

MongoClient.connect(process.env.DATABASE_URL, { useUnifiedTopology: true})
    .then(client => {
        console.log('connected to database')
        const db = client.db('jargonauts')
        const jargonCollection = db.collection('jargonTerms')
        app.use(cors())
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())
        app.use(express.static('public'))
        app.set('view engine','ejs')
        
        app.get('/', (req,res) => { //for tips
            jargonCollection.find(
                {
                    "category": "tips"
                }
            )
                .toArray()
                .then(data => {
                    res.render('index.ejs', { tips: data })
                })
                .catch(err => console.log(err))
        })
        app.get('/tone/:tonalChoice', (req,res) => { 
            const tonalChoice = req.params.tonalChoice.toLowerCase()
            // console.log(tonalChoice)
            jargonCollection.find(
                {
                    "category": "tone",
                    "toneOption": tonalChoice
                }
            )
                .toArray()
                .then(data => {
                    console.log(data)
                    // res.render('index.ejs', { phraseRecd: data })
                    // res.redirect('/') this was returning html? something that could not be parsed client-side as json
                })
                .catch(err => console.log(err))
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

        app.post('/jargon', (req,res)=> {
            if (req.body.passcode != 112){
                console.log(`Need passcode`) 
                res.redirect('/')
            }else {
                jargonCollection.insertOne(req.body)
                    .then(result => {
                        console.log(result)
                        res.redirect('/')
                    })
                    .catch(err => console.log(err))
            }
        })

        app.listen(PORT, ()=> {
            console.log(`Server now running on port ${PORT}`)
        })

    })
    .catch(err => console.log(err))


/* the object **************/ 

const jargon = {
    'tone': {
        'diplomatic': ['Keep me honest here.','At the end of the day, we don\'t have enough boots on the ground and just need to show we did our due diligence.'],
        'sympathetic': ['It\'s the nature of the beast.', 'Hope you\'re well.'],
        'motivational': ['The prize for winning a pie-eating contest is more pie.','There\'s a lot of opportunity in this space.', 'We\'ll have the ballpark figures by COB and the full report ready in the AM.'],
        'provocative' : ['This could have been an email.', 'Per my last email.'],
        'cautionary': ['Let\'s not boil the ocean.', 'But what\'s the value add here?']
    },
    'dictionary': { 
        'mece': '(MECE) Mutually exclusive, collectively exhaustive - describing thorough coverage of an area of market research or problem space',
        'bandwidth': 'bandwidth: Mythical time and energy available for each person to do more',
        'resourcing': 'assigning hours to someone\'s day so that their day exceeds 24 hours',
        'synergistic': 'work well together, like the 15 minutes of overlapping free time in two calendars',
        'circle back': 'return to a subject',
        'leverage': 'to use',
        'land the plane on': 'agree on or bring to a conclusion; confirm definitively (or more definitively than previous state)',
        'deliverables': 'the stuff you work on that the client wants and the contract describes. Compare: "jawn"',
        'pushback': 'resistance, objection to what is being presented',
        'okr': '(OKR) Objectives and Key Results - part of a respectable management strategy',
        'kpi': '(KPI) Key Performance Indicator - type of data point you care about because they might symbolize progress in a desired direction',
        'pls thx': 'equivalent to "I don\'t care how but get it done"; occasionally and erroneously translated as "please, thanks"',
        'not found': 'Not in the dictionary...yet.',
    },
    'tips': [
        'Replace the word "use" in your vocabulary with "leverage". Conjugate accordingly.',
        'Assess, analyze, ideate, strategize, generate, and drive stakeholder alignment.',
        'Nominalization is your friend. Turn every verb into a noun, preferably with more than three syllables.',
        'Don\'t just do it. Conduct, implement, operationalize, or best of all, drive operationalization of it.',
    ],
    'not found': ['Not found; please try again.'],
}

/*********************** */
