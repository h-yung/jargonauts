if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv')
    dotenv.config({path: 'vars.env'})
}
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors') //diff

MongoClient.connect(process.env.DATABASE_URL, { useUnifiedTopology: true})
    .then(client => {
        console.log('connected to database')
        const db = client.db('jargonauts')
        const jargonCollection = db.collection('jargonTerms')
        app.use(cors()) //diff
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())
        app.use(express.static('public'))
        app.set('view engine','ejs')
        
        //tip of day on load
        app.get('/', (req,res) => { 
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
        // phrase recs
        app.get('/tone/:tonalChoice', (req,res) => { 
            const tonalChoice = req.params.tonalChoice.toLowerCase()
            jargonCollection.find(
                {
                    "category": "tone",
                    "toneOption": tonalChoice
                }
            )
                .toArray()
                .then(data => {
                    res.json(data)
                    // res.render('index.ejs', {}) for template eng
                })
                .catch(err => console.log(err))
        })
        // get dictionary
        app.get('/dictionary', (req,res) => { 
            jargonCollection.find(
                {
                    "category": "dictionary",
                }
            )
                .toArray()
                .then(data => {
                    res.json(data)
                    // res.render('index.ejs', {}) for template eng
                })
                .catch(err => console.log(err))
        })

        app.get('/api', (req,res)=> {
            jargonCollection.find().toArray()
                .then(data => {
                    res.json(data)
                })
                .catch(err => console.log(err))
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

        app.listen(process.env.PORT || 8000, ()=> {
            console.log(`Server now running`)
        })

    })
    .catch(err => console.log(err))