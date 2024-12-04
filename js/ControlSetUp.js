// Speed for keyboard herizontal rotation
const rotationStep = Math.PI / 5; // the smaller the faster per button pressed
const lerpFactor = 0.1; // the bigger the smoother


// Device detect for different control set up
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/.test(navigator.userAgent);
}

function horizontalRotateKeyboardControl() {
    const orbitRadius = controls.object.position.distanceTo(controls.target); // Distance from camera to target
    let targetAngle = Math.atan2(
        controls.object.position.z - controls.target.z,
        controls.object.position.x - controls.target.x
    );
    let isAnimating = false; // Track if an animation is in progress
    let enabled = false; // Control toggle

    // Normalize angle difference to avoid issues when crossing the -π to π boundary
    function normalizeAngleDifference(current, target) {
        let difference = target - current;
        // Ensure the angle difference is within the range -π to π
        difference = THREE.MathUtils.euclideanModulo(difference + Math.PI, Math.PI * 2) - Math.PI;
        return difference;
    }

    function updateCameraPosition() {
        const currentAngle = Math.atan2(
            controls.object.position.z - controls.target.z,
            controls.object.position.x - controls.target.x
        );

        // Normalize the angle difference to avoid crossing the π boundary
        const angleDifference = normalizeAngleDifference(currentAngle, targetAngle);
        const newAngle = currentAngle + angleDifference * lerpFactor;

        controls.object.position.x = controls.target.x + orbitRadius * Math.cos(newAngle);
        controls.object.position.z = controls.target.z + orbitRadius * Math.sin(newAngle);
        controls.update();

        // Stop animation once the angle is close enough
        if (Math.abs(angleDifference) > 0.001) {
            requestAnimationFrame(updateCameraPosition);
        } else {
            isAnimating = false; // Stop animation once it has finished
        }
    }

    function handleKeydown(e) {
        if (!enabled || isAnimating) return; // Only process if enabled and not animating

        // Only process when a key is pressed and not during animation
        if (e.code === "ArrowLeft") {
            console.log("ArrowLeft button clicked");
            targetAngle -= rotationStep; // Rotate counter-clockwise
            isAnimating = true; // Start animation
            updateCameraPosition(); // Start the smooth rotation
        } else if (e.code === "ArrowRight") {
            console.log("ArrowRight button clicked");
            targetAngle += rotationStep; // Rotate clockwise
            isAnimating = true; // Start animation
            updateCameraPosition(); // Start the smooth rotation
        }
    }

    window.addEventListener("keydown", handleKeydown);

    // Return an interface to toggle the control
    return {
        enable() {
            enabled = true;
            console.log("Horizontal rotate keyboard control enabled.");
        },
        disable() {
            enabled = false;
            console.log("Horizontal rotate keyboard control disabled.");
        },
        isEnabled() {
            return enabled;
        }
    };
}


function setUpControl() {


    // Use the flag to choose the appropriate controls
    if (MobileDeviceOrNot === true) {
        // Mobile device: Enable device orientation controls
        console.log("Mobile device detected!");
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = true; // Allow rotating
        controls.enableKeys = false;
        controls.minDistance = 200;
        controls.maxDistance = 200;

        // vertical orbit angle
        controls.minPolarAngle = Math.PI * 0.5; // radians
        controls.maxPolarAngle = Math.PI * 0.5; // radians
        // herizontal orbit angle
        //this.minAzimuthAngle = 0; // radians, default -Infinity
        //this.maxAzimuthAngle = 0; // radians, default Infinity

        controls.enabled = false; // Disable controls initially

        rotateControl = horizontalRotateKeyboardControl();
        rotateControl.disable();
        controls.update();
    } else {
        // Orbit Controls - initially disabled
        // Non-mobile device: Enable OrbitControls
        console.log("Non-mobile device detected!");

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = mouseRotate; // Allow rotating
        controls.enableKeys = false;
        controls.minDistance = 200;
        controls.maxDistance = 200;

        // vertical orbit angle
        controls.minPolarAngle = Math.PI * 0.5; // radians
        controls.maxPolarAngle = Math.PI * 0.5; // radians
        // herizontal orbit angle
        //this.minAzimuthAngle = 0; // radians, default -Infinity
        //this.maxAzimuthAngle = 0; // radians, default Infinity

        controls.enabled = false; // Disable controls initially
        controls.update();

        // Add button controls for camera rotation
        rotateControl = horizontalRotateKeyboardControl();
        rotateControl.enable();
        console.log("Is enabled:", rotateControl.isEnabled());
    }
}

