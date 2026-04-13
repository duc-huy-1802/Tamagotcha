let totalTime = 300; // seconds
let timeRemaining = totalTime;
let timerInterval = null;
let maxTimerInput = 1440; // 1 day in minutes

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const setBtn = document.getElementById('setBtn');
const timerDisplay = document.getElementById('timerDisplay');
const customTimeInput = document.getElementById('customTime');

// Prevent invalid input (non-numeric, decimals, 'e')
customTimeInput.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
  if (parseInt(e.target.value) > maxTimerInput) {
    e.target.value = '1440';
  }
});

startBtn.addEventListener('click', () => {
  if (!timerInterval) {
    timerInterval = setInterval(tick, 1000);
    updateButtonStates();
  }
});

pauseBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  updateButtonStates();
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timeRemaining = totalTime;
  updateDisplay();
  updateButtonStates();
});

setBtn.addEventListener('click', () => {
  const mins = parseInt(customTimeInput.value);
  if (mins > 0) {
    clearInterval(timerInterval);
    timerInterval = null;
    totalTime = mins * 60;
    timeRemaining = totalTime;
    updateDisplay();
    updateButtonStates();
  }
});

function tick() {
  timeRemaining--;
  updateDisplay();
  
  if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    timerInterval = null;
    updateButtonStates();
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon-128.png',
      title: 'Timer Complete',
      message: 'Your timer has finished!'
    });
  }
}

function updateDisplay() {
  const hours = Math.floor(timeRemaining / 3600);
  const mins = Math.floor((timeRemaining % 3600) / 60);
  const secs = timeRemaining % 60;
  
  if (hours > 0) {
    timerDisplay.textContent = 
      `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    timerDisplay.textContent = 
      `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

function updateButtonStates() {
  // Enable Start only if timer is NOT running
  startBtn.disabled = timerInterval !== null;
  
  // Enable Pause only if timer IS running
  pauseBtn.disabled = timerInterval === null;
}

// Initialize button states on load
updateButtonStates();