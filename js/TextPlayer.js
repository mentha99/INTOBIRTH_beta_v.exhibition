// Speed for typewriter, the smaller the delay, the faster to type in
let typeInDelay = 30; // 20
let deleteDelay = 3; // 2
let textDuration = 2600; //3500
let lastTextDuration = 80; //100
const blankDuration = 400;

if (textDebugSpeed) {
    typeInDelay = 2; // 20
    deleteDelay = 1; // 2
    textDuration = 50; //3500
    lastTextDuration = 10; //100
}

// Set up text typewriter
const app = document.getElementById('khj3'); // font
const instructionText = new Typewriter(app, { loop: false, delay: typeInDelay, cursor: '' }); // disable cursor
let textID = "";



function displayTextSequence(sequence, index = 0, onComplete = null) {
    // Check if the current text is the last string in the sequence
    const isLastString = index === sequence.length - 1;

    // Use a separate duration for the last string
    const duration = isLastString ? lastTextDuration : textDuration;

    if (index >= sequence.length) {
        if (onComplete) onComplete(); // Call the callback when the sequence finishes
        return;
    }

    const { text } = sequence[index];
    instructionText
        .deleteAll(deleteDelay) // Clear existing text
        .typeString(text) // Type the current text
        .start()
        .callFunction(() => {
            // Wait for the specified duration before displaying the next text
            setTimeout(() => {
                displayTextSequence(sequence, index + 1, onComplete); // Move to the next text in the sequence
            }, duration);
        });
}

/*
function displayTextSequence(sequence, index = 0, onComplete = null) {
    const duration = textDuration;
    if (index >= sequence.length) {
        if (onComplete) onComplete(); // Call the callback when sequence finishes
        return;
    }
    const { text } = sequence[index];
    instructionText
        .deleteAll(deleteDelay) // Clear existing text
        .typeString(text) // Type the current text
        .start()
        .callFunction(() => {
            // Wait for the specified duration before displaying the next text
            setTimeout(() => {
                displayTextSequence(sequence, index + 1, onComplete); // Move to the next text in the sequence
            }, duration);
        });
}
        */