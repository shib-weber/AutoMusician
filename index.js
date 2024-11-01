const express = require('express');
//const mongoose = require('mongoose');
const Routers = require('./routers') 
const {Lyrics} = require('./models/notes')
const path = require('path')
const bodyParser= require('body-parser');

const PORT=2000;
const app= express();

app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine',"ejs")
app.set('views',path.resolve('./views'))

app.use(Routers)

app.listen(PORT,()=>{
    console.log('Server is running in PORT',PORT)
})