var isPlaying = false;
var soundInterval;
var toggleButton = document.getElementById('toggleSound');
var minIntervalInput = document.getElementById('minInterval');
var maxIntervalInput = document.getElementById('maxInterval');
var soundFileSelect = document.getElementById('soundFile');

toggleButton.addEventListener('click', function() {
    if (!isPlaying) {
        startSound();
        toggleButton.classList.remove('btn-danger');
        toggleButton.classList.add('btn-success');
        toggleButton.textContent = 'ON';
    } else {
        stopSound();
        toggleButton.classList.remove('btn-success');
        toggleButton.classList.add('btn-danger');
        toggleButton.textContent = 'OFF';
    }
});

function startSound() {
    isPlaying = true;
    playRandomSound();
}

function stopSound() {
    isPlaying = false;
    clearInterval(soundInterval);
}

function playRandomSound() {
    var audio = new Audio(soundFileSelect.value); // Use selected sound file
    audio.play();

    // Set a new interval for the next sound
    var newInterval = getRandomInterval();
    setTimeout(function() {
        if (isPlaying) {
            clearInterval(soundInterval); // Clear the current interval
            soundInterval = setInterval(playRandomSound, newInterval); // Set a new interval
        }
    }, newInterval);
}

function getRandomInterval() {
    // Return a random interval between minInterval and maxInterval
    var min = parseInt(minIntervalInput.value);
    var max = parseInt(maxIntervalInput.value);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
