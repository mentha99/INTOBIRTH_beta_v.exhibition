let container, camera, renderer, scene;

        function init() {
            container = document.querySelector(".scene");

            // Create scene and camera
            scene = new THREE.Scene();
            scene.background = new THREE.Color('transparent');
            const fov = 90;
            const aspect = container.clientWidth / container.clientHeight;
            const near = 0.01;
            const far = 4000;
            camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

            // Renderer setup
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);

            // Setup textures and sphere geometry
            setupMaskEffect();
        }

        // Set up mask effect with still image and video overlay
        function setupMaskEffect() {
            const videoEye = document.getElementById('videoEye');
            const videoTextureEye = new THREE.VideoTexture(videoEye);
            const stillImageTexture = new THREE.TextureLoader().load('images/frame0.png', () => {
                console.log("Still image loaded.");
            });

            // Shader material to blend mask and still image
            const sphereMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    baseTexture: { value: stillImageTexture },
                    maskTexture: { value: videoTextureEye },
                },
                vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform sampler2D baseTexture;
                    uniform sampler2D maskTexture;
                    varying vec2 vUv;
                    void main() {
                        vec4 baseColor = texture2D(baseTexture, vUv);
                        vec4 maskColor = texture2D(maskTexture, vUv);
                        vec4 finalColor = mix(baseColor, vec4(0.0, 0.0, 0.0, 1.0), 1.0 - maskColor.r);
                        gl_FragColor = finalColor;
                    }
                `,
                transparent: true,
                side: THREE.DoubleSide
            });

            const geometry = new THREE.SphereGeometry(2000, 36, 18);
            const sphere = new THREE.Mesh(geometry, sphereMaterial);
            sphere.rotation.y = Math.PI / 2;
            scene.add(sphere);

            videoEye.addEventListener('play', () => {
                console.log("Mask video playing.");
                renderMaskScene();
            });

            videoEye.addEventListener('ended', () => {
                console.log("Mask video ended, switching to main video.");
                switchToMainVideo();
            });
        }

        // Render the mask scene
        function renderMaskScene() {
            requestAnimationFrame(renderMaskScene);
            renderer.render(scene, camera);
        }

        // Switch to main video after mask ends
        function switchToMainVideo() {
            const video2 = document.getElementById('video2');
            const videoTexture2 = new THREE.VideoTexture(video2);
            const mainMaterial = new THREE.MeshBasicMaterial({ map: videoTexture2, side: THREE.DoubleSide });

            // Replace the material with main video texture
            scene.children[0].material = mainMaterial;
            video2.style.display = "block";
            video2.pause();
            enableInteractiveControl();
        }

        // Enable interactive controls
        function enableInteractiveControl() {
            const video2 = document.getElementById('video2');
            const fps = 24;
            const candleLit = 110;
            const songPlay = 270;
            const totalFrames = 560;
            let playbackInterval;

            // Convert frame to time in seconds
            function frameToTime(frame) {
                return frame / fps;
            }

            function playForwardToTarget(startFrame, endFrame) {
                clearInterval(playbackInterval);
                video2.currentTime = frameToTime(startFrame);
                video2.play();
                playbackInterval = setInterval(() => {
                    if (video2.currentTime >= frameToTime(endFrame)) {
                        video2.pause();
                        clearInterval(playbackInterval);
                    }
                }, 50);
            }

            function playBackwardToStart() {
                clearInterval(playbackInterval);
                playbackInterval = setInterval(() => {
                    if (video2.currentTime <= frameToTime(0)) {
                        video2.currentTime = frameToTime(candleLit);
                    } else {
                        video2.currentTime -= 0.05;
                    }
                }, 50);
            }

            window.addEventListener("keydown", (e) => handleInteraction(e.code));

            function handleInteraction(action) {
                if (action === "ArrowUp" && video2.currentTime < frameToTime(candleLit)) {
                    playForwardToTarget(Math.round(video2.currentTime * fps), candleLit);
                } else if (action === "ArrowDown" && video2.currentTime < frameToTime(candleLit) && video2.currentTime > frameToTime(0)) {
                    playBackwardToStart();
                } else if (action === "Enter" && Math.floor(video2.currentTime * fps) === candleLit) {
                    playForwardToTarget(candleLit + 1, songPlay);
                } else if (action === "Space" && Math.floor(video2.currentTime * fps) === songPlay) {
                    playForwardToTarget(songPlay, 465);
                } else if (action === "Backspace" && Math.floor(video2.currentTime * fps) === 465) {
                    playForwardToTarget(466, totalFrames);
                }
            }



            // Mobile touch interactions
            let startY, endY;
            document.addEventListener("touchstart", (e) => {
                startY = e.touches[0].clientY;
            });

            document.addEventListener("touchmove", (e) => {
                endY = e.touches[0].clientY;
            });

            document.addEventListener("touchend", () => {
                const swipeDistance = endY - startY;
                if (swipeDistance < -50) {
                    handleInteraction("ArrowUp");
                } else if (swipeDistance > 50) {
                    handleInteraction("ArrowDown");
                } else {
                    const currentFrame = Math.floor(video2.currentTime * fps);
                    if (currentFrame === candleLit) {
                        handleInteraction("Enter");
                    } else if (currentFrame === songPlay) {
                        handleInteraction("Space");
                    } else if (currentFrame === 465) {
                        handleInteraction("Backspace");
                    }
                }
            });

            // Display instructions based on the current frame
            video2.addEventListener("timeupdate", () => {
                const currentFrame = Math.floor(video2.currentTime * fps);
                const app = document.getElementById('khj3');
                const instructionText = new Typewriter(app, { loop: false, delay: 75 });
                instructionText.deleteAll(10);

                if (currentFrame === candleLit) {
                    instructionText.typeString('Press ENTER to light up the candle.').start();
                } else if (currentFrame === songPlay) {
                    instructionText.typeString('Press SPACEBAR to listen to the blessing of singing.').start();
                } else if (currentFrame === 465) {
                    instructionText.typeString('Press BACKSPACE to blow out the candle.').start();
                }
            });

            // Stop playback when Space key is released
            window.addEventListener("keyup", (e) => {
                if (e.code === "ArrowUp" || e.code === "ArrowDown" || (e.code === "Space" && video2.currentTime >= frameToTime(270) && video2.currentTime < frameToTime(465))) {
                    clearInterval(playbackInterval);
                    video2.pause();
                }
            });
        }

        init();

        window.addEventListener("resize", () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
        //Orbit Controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.minDistance = 200;
        controls.maxDistance = 200;
        controls.enableZoom = true;
        controls.enablePan = false;