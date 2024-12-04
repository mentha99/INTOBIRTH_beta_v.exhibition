//initial audio elements
const BGM_inWild = new Audio("audio/BGM_EATEOT.mp3");
const SFX_candleLitUp = new Audio("audio/SFX_candleLitUp.mp3");
const SFX_candleBurn = new Audio("audio/SFX_candleBurn.mp3");
const SFX_grassWave = new Audio("audio/SFX_grassWave.mp3");
const SFX_grassGrow = new Audio("audio/SFX_grassGrow.mp3");
const SFX_candleHum = new Audio("audio/SFX_candleHumming.mp3");
const SFX_candleBlow = new Audio("audio/SFX_candleBlow.mp3");

const SFX_blowBreath = new Audio("audio/SFX_blowBreath.mp3");
const SFX_grassWaveTurnAround = new Audio("audio/SFX_grassWaveTurnAround.mp3");
const SFX_pathExtend = new Audio("audio/SFX_pathExtend.mp3");
const SFX_stepCandleBlow = new Audio("audio/SFX_stepCandleBlow.mp3");
const SFX_turnAround = new Audio("audio/SFX_turnAround.mp3");
const SFX_turnAround2 = new Audio("audio/SFX_turnAround2.mp3");
const SFX_windPeopleDis = new Audio("audio/SFX_windPeopleDisappear.mp3");




const BIRTH_Aunt = new Audio("audio/Birth_Aunt.mp3");
const BIRTH_Dad = new Audio("audio/Birth_Dad.mp3");
const BIRTH_Ella = new Audio("audio/Birth_Ella.mp3");
const BIRTH_Mom = new Audio("audio/Birth_Mom.mp3");
const BIRTH_Uncle = new Audio("audio/Birth_Uncle.mp3");


const SFX_step1 = new Audio("audio/SFX_step1.mp3");
const SFX_step2 = new Audio("audio/SFX_step2.mp3");
const SFX_step3 = new Audio("audio/SFX_step3.mp3");
const SFX_step4 = new Audio("audio/SFX_step4.mp3");

const allAudioElements = [
    BGM_inWild,
    SFX_candleLitUp,
    SFX_candleBurn,
    SFX_grassWave,
    SFX_grassGrow,
    SFX_candleHum,
    SFX_candleBlow,
    BIRTH_Aunt,
    BIRTH_Dad,
    BIRTH_Ella,
    BIRTH_Mom,
    BIRTH_Uncle,
    SFX_step1,
    SFX_step2,
    SFX_step3,
    SFX_step4,
    SFX_blowBreath,
    SFX_grassWaveTurnAround,
    SFX_pathExtend,
    SFX_stepCandleBlow,
    SFX_turnAround,
    SFX_turnAround2,
    SFX_windPeopleDis,
];

// Function to load all audio elements
function loadAllAudioOnClick(audioElements) {
    return new Promise((resolve, reject) => {
        let loadedCount = 0;

        // Attach event listeners and start loading each audio
        audioElements.forEach(audio => {
            function onLoad() {
                loadedCount++;
                console.log(`Audio loaded: ${audio.src}`);

                // Set volume to 0 and try playing the audio
                audio.volume = 0.01; // Play silently
                audio.play().then(() => {
                    console.log(`Audio playing silently: ${audio.src}`);
                    audio.pause(); // Pause immediately after playing
                    audio.currentTime = 0; // Reset playback position
                }).catch(err => {
                    console.error(`Audio play failed for ${audio.src}:`, err);
                });

                if (loadedCount === audioElements.length) {
                    resolve(); // All audio files are loaded and attempted to play
                    console.log("All audio files loaded and attempted to play successfully.");
                }
            }

            // Listen for the 'canplaythrough' or similar events
            audio.addEventListener('canplaythrough', onLoad, { once: true });
            audio.addEventListener('loadeddata', onLoad, { once: true });
            audio.addEventListener('loadedmetadata', onLoad, { once: true });

            // Trigger loading
            audio.load();
        });
    });
}