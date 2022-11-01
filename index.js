const startBtn = document.getElementById('start');
const output = document.getElementById('output');
const speakBtn = document.getElementById('speech-start');
const speakOutput = document.getElementById('speak-output');

// Chrome doesn't automatically load voices so this is necessary to load them
let voices = [];

function populateVoice() {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    voices = window.speechSynthesis.getVoices();
    // Console log remains as a reference to all the usable voices and their data
    console.log(voices);
  });
}

populateVoice();
// End pre-loading voices for Chrome

// Function to use speech-to-text and populate it on the screen
function speak() {
  output.textContent = 'Recording...';
  const recognition = new webkitSpeechRecognition();
  recognition.contiuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function (e) {
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) {
        const content = e.results[i][0].transcript.trim();
        output.textContent = content;
      }
    }
  };
}
// Function to speak back the text that was recorded using text-to-speech API
function speakBack() {
  const msg = new SpeechSynthesisUtterance(output.textContent);
  msg.volume = 1;
  msg.lang = 'en-US';
  msg.pitch = 1;
  msg.rate = 1;
  // Currently set to "Victoria" voice
  msg.voice = voices[41];

  window.speechSynthesis.speak(msg);
}

startBtn.addEventListener('click', () => speak());
speakBtn.addEventListener('click', () => speakBack());
