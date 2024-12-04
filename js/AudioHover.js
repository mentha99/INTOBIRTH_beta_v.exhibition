// Function to add an audio icon that maintains its position relative to the camera
function addAudioIcon(iconFile, audioFile, offset, raycaster, hoverScale = 1.5, volumeLower = 0.2, volumeHigher = 1.0) {
    // Define audio element
    const audio = new Audio(audioFile);
    audio.volume = volumeLower;
    audio.loop = true;

    // Track hover state for this icon
    let isHovering = false;

    // Create the music icon as PlaneGeometry
    const geometry = new THREE.PlaneGeometry(60, 60); // Width and height of the plane
    const texture = new THREE.TextureLoader().load(iconFile); // Load the icon texture
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const iconPlane = new THREE.Mesh(geometry, material);
    iconPlane.visible = false; // Initially hidden
    scene.add(iconPlane);

    // Show icon and start audio only when video is in the specified range
    video2.addEventListener("timeupdate", () => {
        const currentFrame = Math.floor(video2.currentTime * fps);
        if (currentFrame > songPlayR2 && currentFrame < candleBlow) {
            iconPlane.visible = true; // Show the icon
            if (audio.paused) audio.play(); // Play audio if it's paused
        } else {
            iconPlane.visible = false; // Hide the icon
            audio.pause(); // Pause the audio
            audio.currentTime = 0; // Reset audio to start
        }
    });

    // Define mouse position variable
    const mouse = new THREE.Vector2();

    // Update mouse position on move
    window.addEventListener("mousemove", (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Render loop for updating position and detecting hover state
    function renderIcon() {
        if (iconPlane.visible) {
            // Calculate the icon's position relative to the world's origin
            const worldPosition = new THREE.Vector3().copy(offset);
            //const iconRotation = camera.rotation;
            //worldPosition.applyEuler(iconRotation); // Rotate the offset with the camera

            // Position the icon plane relative to the camera
            iconPlane.position.copy(worldPosition).add(camera.position);
            // Make the icon plane face the camera's position
            iconPlane.lookAt(camera.position);

            // Apply the inverse of the camera's rotation to the icon plane
            //iconPlane.quaternion.copy(camera.quaternion).invert();

            // Detect hover state with raycasting
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(iconPlane);

            if (intersects.length > 0) {
                if (!isHovering) {
                    audio.volume = volumeHigher; // Increase volume on hover
                    isHovering = true;
                    iconPlane.scale.set(hoverScale, hoverScale, 1); // Resize on hover
                }
            } else if (isHovering) {
                audio.volume = volumeLower; // Reset volume when not hovering
                isHovering = false;
                iconPlane.scale.set(1, 1, 1); // Reset size
            }
        }

        // Request next frame for render loop
        requestAnimationFrame(renderIcon);
    }

    // Start the render loop
    renderIcon();
}


