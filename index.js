const startBtn = document.getElementById('start');
const output = document.getElementById('output');

function speak() {
  output.textContent = 'Recording...';
  const recognition = new webkitSpeechRecognition();
  recognition.contiuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.start();
  
  recognition.onresult = function(e) {
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) {
        const content = e.results[i][0].transcript.trim();
        output.textContent = content;
      }
    }
  }
}

startBtn.addEventListener('click', () => speak());


