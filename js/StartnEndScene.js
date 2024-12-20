let instructionScreen;
let instructionImage;

function restartWebsite() {
    location.reload(); // Refreshes the current page
}

// Function to display the instruction screen
function setUpInstructionScreen() {
    instructionScreen = document.getElementById('instruction-screen');
    instructionImage = document.getElementById('instruction-image');

    // Set the appropriate image based on the parameter
    if (MobileDeviceOrNot) {
        instructionImage.src = "images/control_Mobile.png";
    } else {
        instructionImage.src = "images/control_Exhibition.png";
    }
    instructionScreen.classList.add('hidden');
}



function showCredits() {
    console.log("credit show");

    // Initialize a variable to track the state of keys
    let keysPressed = {
        'Enter': false,
        'ArrowUp': false
    };

    // Listen for keydown events to track when keys are pressed
    window.addEventListener('keydown', (e) => {
        // Set the respective key state to true when pressed
        if (e.code === 'Enter') {
            keysPressed['Enter'] = true;
        }
        if (e.code === 'ArrowUp') {
            keysPressed['ArrowUp'] = true;
        }
        if (keysPressed['Enter'] && keysPressed['ArrowUp']) {
            restartWebsite();
        }
    });

    //enableLeaveKeyListener();
    // Check if credits container already exists, if not, create it
    let creditsContainer = document.querySelector('.credits-container');
    if (!creditsContainer) {
        creditsContainer = document.createElement("div");
        creditsContainer.classList.add("credits-container");
        creditsContainer.innerHTML = `
          <div class="credits">
            <h2>INTO BIRTH</h2>
            <p>an immersive experience<br>through a surreal memory</p>
            
            <h2>Director/<br>Programmer/<br>3DArtist</h2>
            <p>Xinran WU
                <br><br>initially inspired by
                <br>a random 3D scene scan
                <br>captured from my birthday
                <br>last summer
                <br><br>
            </p>
            <img class="content" src="images/rawScan.png" >

            <h2>Interactive<br>Web Code</h2>
            <p>writing with HTML, javascript 
                <br>and Three.js
                <br>with troubleshooting support 
                <br>from ChatGPT
                <br>and the rookie's instruction 
                <br>from coolest deskmate Eric
                <br><br>GPT is great
                <br>but you are the PRO
                <br>thank you 
                <br>Eric and Mr.GPT
                <br><br>
            </p>
            <img class="content" src="images/EricWave.jpg" >
            <p>If anyone is looking for
                <br>a real web designer
                <br>please contact eric

            <h2>Panorama<br>Animation Scene</h2>
            <p>cooking with Unreal Enging 5
                <br>with blueprint debugging
                <br>from omnipotent TA Ina and
                <br>3D Gaussian Splat assets
                <br>generated by LumaAI
                <br><br>thank you 
                <br>Ina and Mr.Luma
            </p>

            <h2>Music</h2>
            <p>EATEOT
                <br>(Everywhere at the End of Time)
                <br>stage 3
                <br>by The Caretaker, 2017
                <br><br>and countless
                <br>sound effect youtubers
                <br>thank you my neighbor Jimmy
                <br>for great recommendation
            </p>

            <h2>Exhibition</h2>
            <p>for Creative Coding
                <br>2024fall semester
                <br><br>thank you Prof.Curime
                <br>for kind suggestions
                <br>on scenes and storytelling
                <br>and setting up this
                <br>sweet living room corner
            </p>

            <h2>Finally</h2>
            <p>thank you
                <br>the one who sits or stands 
                <br>or sleeps
                <br>in front of this screen
                <br>for joining the whole journey
                <br>together with me
                <br><br>Will be REALLY GLAD
                <br>to see any feedback
                <br>or bug reports
                <br>can find me on Instagram
                <br>@_mentha99
                <br>        
                <br>Wish you have a sweet dream
                <br><br>
                <br>Best,
                <br>Xinran
                <br>2024.12<br>
            </p>
            <h2><br><br><br><br><br><br><br><br><br><br><br><br></h2>

            
            <img class="logo" src="images/icons/LoadingPage_01.png">
            <p class="restart-text" onclick="restartWebsite()">Click here or<br>press Enter and Up button together<br>to be into birth again</p>
            <p><br><br><br><br><br><br>
                <br>Will be more than GLAD
                <br>to see any feedback
                <br>or bug reports :)
                <br>can find me on Instagram
                <br>@_mentha99<br><br>
            </p>
          </div>
        `;
        document.body.appendChild(creditsContainer);
    }
    // Show the credits
    creditsContainer.classList.add("show");


    // Optionally hide credits after animation ends
    const animationDuration = 500000; // Match animation duration in CSS
    setTimeout(() => {
        creditsContainer.classList.remove("show");
    }, animationDuration);
}
/*
Finally
thank you
the one who sits or stands or lies
in front of this screen
for joining the entire journey
together with me

Wish you have a sweet dream

Best,
Xinran

INTO BIRTH
2024.12

Music
EATEOT (Everywhere at the End of Time)
stage 3
by The Caretaker, 2017
and countless
sound effect youtubers
thank you Jimmy
for great recommendation

Final Exhibition 
for Creative Coding
2024fall semester
thank you Prof.Curime
for kind suggestions
on scenes and storytelling
and setting up this cute
living room corner



Web Code
writing with HTML, javascript and Three.js
under the rookie's instruction 
from my coolest deskmate Eric
and
troubleshooting support 
from ChatGPT
thank you Eric and Mr.GPT

Panorama Scene
cooking with Unreal Enging 5
with blueprint debugging
from omnipotent TA Ina
and
3D Gaussian Splat assets
generated by LumaAI
thank you Ina and Mr.Luma

*/