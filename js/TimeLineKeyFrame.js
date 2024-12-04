//Timeline parameters control


let playbackInterval;
const intervalTime = 41.67; //1000ms / 25 fps = 40ms

//total frame per second
const fps = 24;


// Keyframe
const eyeOpen = 0;
const wakeUp = 240;
const pathShow = 260;
const moveStart = 360;
const moveSecond = 400;
const moveOnGrass1 = 520;
const moveOnGrass2 = 600;
const moveSeeTable = 680;
const moveSeeCake = 760;
const moveSeeMatch = 800;
const candleLit = 840;
const peopleShow = 855;
const songPlayR1 = 1040;
const songPlayR2 = 1400;
const songPlayR3 = 1760;
const candleBlow = 2120;
const peopleFade = 2165;//2165
const skyLit = 2326; //2299
const viewToHouse = 2420;
const pathFade = 2616;
const houseLit = 2760;
const viewToTable = 2840;
const walkAround = 2940;
const backHome = 2990;
const readyLeave = 3330;
const eyeClose = 3405;
const totalFrame = 3600;


// Walking
const moveSteps = 12 // number to cut
const stepLength = 40; // Divide the segment into pieces
const stepFrames = [];
for (let i = moveStart; i < candleLit; i += stepLength) {
    stepFrames.push(i);
}


//let currentSection = 0; // Track the current section from 0 to 4