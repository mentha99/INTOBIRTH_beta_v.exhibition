function setupPanorama() {
    const video2 = document.getElementById('video2');
    const videoTexture2 = new THREE.VideoTexture(video2);
    const mainMaterial = new THREE.MeshBasicMaterial({ map: videoTexture2, side: THREE.DoubleSide });

    // Hide the video element and set it to paused initially
    video2.style.display = "none";
    video2.currentTime = videoStartFrame / fps;
    video2.pause();
    // Start from the beginning

    // Show a loading screen while the video is preloading
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = "flex";

    // Preload the audio
    //preloadAudioFiles(allAudioElements);

    // Preload the video
    video2.load(); // Start loading

    video2.addEventListener('canplaythrough', () => {
        console.log("Video is ready.");
        // Once the video is ready, fade out the loading screen
        document.getElementById('loading-screen').classList.add('hidden');
        // Delay the display of the instruction screen
        setTimeout(() => {
            if (!ifInstructionScreenShowed) {
                instructionScreen.classList.remove('hidden');
                console.log("instruction show");
                ifInstructionScreenShowed =true;
                setTimeout(() => {
                    // Print initial text
                    instructionText
                        .typeString("[Press ENTER to start]<br>Currently the audio<br>ONLY work on laptop/PC<br>* Fixing in progress * ")
                        .start()
                }, 4000);
            }

        }, 6000); // 5-second delay


        // Set up the 3D sphere with the video texture
        const geometry = new THREE.SphereGeometry(2000, 36, 18);
        const sphere = new THREE.Mesh(geometry, mainMaterial);
        sphere.rotation.y = Math.PI / 2; // Adjust orientation
        scene.add(sphere);

        // Start rendering the scene but keep the video paused
        renderPanorama();
        InteractiveControl(); // Attach your key controls
    });


}

let ifInstructionScreenShowed = false;

// Render the mask scene
function renderPanorama() {
    requestAnimationFrame(renderPanorama);
    renderer.render(scene, camera);
}

/*
function setupPanorama() {
    const video2 = document.getElementById('video2');
    const videoTexture2 = new THREE.VideoTexture(video2);
    const mainMaterial = new THREE.MeshBasicMaterial({ map: videoTexture2, side: THREE.DoubleSide });

    // Replace the material with main video texture
    video2.style.display = "block";
    video2.currentTime = initPanoramaFrame / fps;
    console.log("currentTime: ", video2.currentTime);
    video2.pause();

    const geometry = new THREE.SphereGeometry(2000, 36, 18);
    const sphere = new THREE.Mesh(geometry, mainMaterial);
    sphere.rotation.y = Math.PI / 2;
    scene.add(sphere);
    renderPanorama();
    InteractiveControl();
}
    */