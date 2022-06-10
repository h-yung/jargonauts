const express = require('express')
const app = express()




app.set('view engine','ejs')
app.use(express.static('public'))


app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    // when you're using ejs - below -->
    res.render('index.ejs', { info: data })
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server running on port 3000 or other')
})