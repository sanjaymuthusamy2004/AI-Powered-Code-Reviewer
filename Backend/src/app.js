const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors  = require('cors')

// server creation
const app = express()

app.use(cors())
app.use(express.json())

// creating router and responding
app.get('/',(req,res)=>{
    res.send('Hello Sanjay')
})

app.use('/ai',aiRoutes)
module.exports = app