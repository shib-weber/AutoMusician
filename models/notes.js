const mongoose = require('mongoose')

const LyricsSchema = mongoose.Schema({
    title: { type: String, required: true },
    lyrics: { type: String, required: true },
    chords: [{ position: Number, chord: String }], // Position and chord name
});
const ChordSchema = mongoose.Schema({
    name: { type: String, required: true },
    frequencyPattern: [Number], // Pattern for each chord (for matching)
});

const Lyrics = mongoose.model("Lyrics", LyricsSchema);
const Chord = mongoose.model("Chord", ChordSchema);

module.exports={Lyrics , Chord}