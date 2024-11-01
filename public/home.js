document.getElementById("StartA").addEventListener("click", startAudio);

async function startAudio() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    const input = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    
    input.connect(analyser);

    function processAudio() {
        const buffer = new Float32Array(analyser.fftSize);
        analyser.getFloatTimeDomainData(buffer);
        const frequencies = fft(buffer); // Run FFT

        // Match frequencies to known chords
        const matchedChord = matchChord(frequencies);
        if (matchedChord !== null) highlightChord(matchedChord);

        requestAnimationFrame(processAudio);
    }
    processAudio();
}

let currentChord = 0;

function highlightChord(chord) {
    document.getElementById(`chord-${currentChord}`).classList.remove('highlight');
    document.getElementById(`chord-${chord}`).classList.add('highlight');
    currentChord = chord;

    // Auto-scroll
    document.getElementById(`chord-${chord}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
}

const knownChords = [
    { name: "Am", frequencyPattern: [220.00, 261.63, 329.63] },
    { name: "F", frequencyPattern: [174.61, 220.00, 261.63] }, 
    { name: "Em", frequencyPattern: [164.81, 196.00, 246.94] },
    { name: "Em7", frequencyPattern: [261.63, 329.63, 392.00] },
    { name: "G", frequencyPattern: [392.00, 493.88, 261.63] },
    { name: "Dsus4", frequencyPattern: [293.66, 392.00, 440.00] },
    { name: "A7sus4", frequencyPattern: [440.00, 329.63, 293.66] }
];

function calculateSimilarity(frequencies1, frequencies2) {
    const length = Math.min(frequencies1.length, frequencies2.length);
    let sum = 0;

    for (let i = 0; i < length; i++) {
        sum += (frequencies1[i] - frequencies2[i]) ** 2;
    }

    return Math.sqrt(sum);
}

function matchChord(frequencies) {
    let closestMatchIndex = -1;
    let lowestDifference = Infinity;

    knownChords.forEach((chord, index) => {
        const difference = calculateSimilarity(frequencies, chord.frequencyPattern);
        
        if (difference < lowestDifference) {
            lowestDifference = difference;
            closestMatchIndex = index;
        }
    });

    return closestMatchIndex; // Returns the index of the closest matching chord
}
