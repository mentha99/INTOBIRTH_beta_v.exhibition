let VideoEndOrNot = false;

function frameToTime(frame) {
    return frame / fps;
}

// Function to start the video and call a callback when it ends
function playForwardToTarget(startFrame, endFrame, onEndCallback = null, _intervalTime = intervalTime) {
    VideoEndOrNot = false;
    console.log("Video starts");

    clearInterval(playbackInterval); // Clear any previous interval
    video2.currentTime = frameToTime(startFrame);  // Set the current time of the video
    video2.play();  // Start the video

    playbackInterval = setInterval(() => {
        if (video2.currentTime >= frameToTime(endFrame)) {
            video2.pause();  // Pause the video once it reaches the end frame
            clearInterval(playbackInterval);  // Clear the interval

            VideoEndOrNot = true;  // Set the flag to true

            console.log("Video ended");

            // Call the onEndCallback function (which could be audioPlay or any other function)
            if (onEndCallback) {
                onEndCallback();  // Call the provided callback
            }
        }
    }, _intervalTime);
}

function playBackwardToTarget(startFrame, endFrame, _intervalTime = intervalTime) {
    clearInterval(playbackInterval);
    video2.currentTime = frameToTime(endFrame); // Start at endFrame to move backward
    video2.play();

    playbackInterval = setInterval(() => {
        // Move backwards until we reach startFrame
        if (video2.currentTime <= frameToTime(startFrame)) {
            video2.pause();
            video2.currentTime = frameToTime(startFrame); // Ensure we end exactly at startFrame
            clearInterval(playbackInterval);
        } else {
            // Decrement the currentTime by a small amount (0.05 seconds)
            video2.currentTime -= 2 / fps; // You can adjust this value for different playback speeds
        }
    }, _intervalTime); // The interval checks every 50 milliseconds
}