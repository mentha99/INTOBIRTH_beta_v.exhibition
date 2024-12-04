/**
 * Function to manage audio playback, volume, and looping
 * @param {string} action - Action to perform: "play", "pause", "stop", "volume", "loop"
 * @param {number} volume - (Optional) Volume level between 0 and 1
 * @param {boolean} loop - (Optional) Whether to loop the audio (default: false)
 */


function handleAudio(audioFile, action, volume = 1.0, targetVolume = 1.0, lerpSpeed = 0.01) {
    let lerpInterval;
    switch (action) {
        case "play":
            audioFile.loop = false; // Enable/disable looping
            audioFile.volume = volume;
            audioFile.play();
            break;
        case "playLoop":
            audioFile.loop = true; // Enable/disable looping
            audioFile.volume = volume;
            audioFile.play();
            break;
        case "pause":
            audioFile.pause();
            break;
        case "stop":
            audioFile.pause();
            audioFile.currentTime = 0; // Reset the audio to the start
            break;
        case "lerpVolume":
            if (lerpInterval) {
                clearInterval(lerpInterval); // Clear any existing lerp interval
            }
            lerpInterval = setInterval(() => {
                const currentVolume = audioFile.volume;
                const delta = targetVolume - currentVolume;
                if (Math.abs(delta) < lerpSpeed) { // Close enough to target
                    audioFile.volume = targetVolume; // Set to exact target volume
                    clearInterval(lerpInterval); // Stop lerping
                } else {
                    audioFile.volume = currentVolume + delta * lerpSpeed; // Lerp toward target
                }
            }, intervalTime); // Frequency of updates
            break;
        case "loop":
            audioFile.loop = loop; // Set the loop property dynamically
            break;
        default:
            console.warn("Invalid audio action");
    }
}