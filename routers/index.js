const express = require('express');
const mongoose = require('mongoose');
//const {Lyrics} = require('../models/notes')
const path = require('path')
const bodyParser= require('body-parser');
const fft = require("fft-js").fft;


const router=express.Router()

router.use(express.json());
router.use(bodyParser.json())
router.use(express.urlencoded({extended:true}))
router.use(bodyParser.urlencoded({extended:false}))
router.use(express.static(path.join(__dirname,'public')));

const Lyrics = {
  title: "Sun Raha Hai Na Tu",
  artist: "Ankit Tiwari",
  lyrics: [
      {
          line: "Mujh ko iraade de,",
          chords: [{ text: "Am", position: 5 }]
      },
      {
          line: "Kasmein de, vaade de",
          chords: [{ text: "F", position: 5 }]
      },
      {
          line: "Meri duaaon ke ishaaron ko sahaare de",
          chords: [
              { text: "G", position: 0 },
              { text: "Em", position: 25 },
              { text: "F", position: 45 }
          ]
      },
  ]
};


router.get('/',(req,res)=>{
    res.render('home',{Lyrics:Lyrics})
})
router.get('/data',(req,res)=>{
    res.render('data')
})

module.exports = router