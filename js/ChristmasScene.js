// 随机数生成器，返回[min, max]范围内的随机数
function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // 随机选择一个数组中的元素
  function randChoise(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
export class ChristmasScene {
  constructor(scene, camera, renderer, fftSize = 2048, totalPoints = 4000) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.fftSize = fftSize;
    this.totalPoints = totalPoints;
    this.step = 0;
    this.uniforms = {
      time: { type: "f", value: 0.0 },
      step: { type: "f", value: 0.0 },
      tAudioData: { type: "t", value: null },  // 音频数据
    };
    this.analyser = null;
    this.audio = null;
  }

  init() {
    this.setupRenderer();
    this.setupCamera();
    this.setupScene();
    this.setupAudio();
    this.setupEffects();
    this.addEventListeners();
    this.animate();
  }

  setupRenderer() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(-0.1, -2.6, 24.4);
    this.camera.rotation.set(0.1, -0.004, 0.0004);
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
  }

  setupAudio() {
    const listener = new THREE.AudioListener();
    this.audio = new THREE.Audio(listener);
    this.analyser = new THREE.AudioAnalyser(this.audio, this.fftSize);
  }

  setupEffects() {
    const format = this.renderer.capabilities.isWebGL2 ? THREE.RedFormat : THREE.LuminanceFormat;
    this.uniforms.tAudioData.value = new THREE.DataTexture(this.analyser.data, this.fftSize / 2, 1, format);

    // 确保传递正确的参数
    this.addPlane(this.scene, this.uniforms, 4000);
    this.addSnow(this.scene, this.uniforms);
    this.addTree([20, 0, 0]);
    this.addTree([-20, 0, 0]);

    const renderScene = new THREE.RenderPass(this.scene, this.camera);
    const bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85
    );

    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.addPass(renderScene);
    this.composer.addPass(bloomPass);
  }

  addEventListeners() {
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  animate() {
    this.analyser.getFrequencyData();
    this.uniforms.tAudioData.value.needsUpdate = true;
    this.step = (this.step + 1) % 1000;
    this.uniforms.time.value = performance.now();
    this.uniforms.step.value = this.step;
    this.composer.render();
    requestAnimationFrame(this.animate.bind(this));
  }

  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
  }

  // 添加雪花效果
  addSnow(scene, uniforms) {
    const vertexShader = `
      attribute float size;
      attribute float phase;
      attribute float phaseSecondary;

      varying vec3 vColor;
      varying float opacity;

      uniform float time;
      uniform float step;

      float norm(float value, float min, float max ){
        return (value - min) / (max - min);
      }
      float lerp(float norm, float min, float max){
        return (max - min) * norm + min;
      }

      float map(float value, float sourceMin, float sourceMax, float destMin, float destMax){
        return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
      }

      void main() {
        float t = time * 0.0006;
        vColor = color;
        vec3 p = position;

        p.y = map(mod(phase + step, 1000.0), 0.0, 1000.0, 25.0, -8.0);
        p.x += sin(t + phase);
        p.z += sin(t + phaseSecondary);

        opacity = map(p.z, -150.0, 15.0, 0.0, 1.0);

        vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);

        gl_PointSize = size * (100.0 / -mvPosition.z);

        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D pointTexture;
      varying vec3 vColor;
      varying float opacity;

      void main() {
        gl_FragColor = vec4(vColor, opacity);
        gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
      }
    `;

    function createSnowSet(sprite) {
      const totalPoints = 300;
      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          ...uniforms,
          pointTexture: {
            value: new THREE.TextureLoader().load(sprite),
          },
        },
        vertexShader,
        fragmentShader,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true,
      });

      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const colors = [];
      const sizes = [];
      const phases = [];
      const phaseSecondaries = [];

      const color = new THREE.Color();

      for (let i = 0; i < totalPoints; i++) {
        const [x, y, z] = [rand(25, -25), 0, rand(15, -150)];
        positions.push(x);
        positions.push(y);
        positions.push(z);

        color.set(randChoise(["#f1d4d4", "#f1f6f9", "#eeeeee", "#f1f1e8"]));
        colors.push(color.r, color.g, color.b);
        phases.push(rand(1000));
        phaseSecondaries.push(rand(1000));
        sizes.push(rand(4, 2));
      }

      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
      geometry.setAttribute("phase", new THREE.Float32BufferAttribute(phases, 1));
      geometry.setAttribute("phaseSecondary", new THREE.Float32BufferAttribute(phaseSecondaries, 1));

      const mesh = new THREE.Points(geometry, shaderMaterial);
      scene.add(mesh);
    }

    const sprites = [
      "https://assets.codepen.io/3685267/snowflake1.png",
      "https://assets.codepen.io/3685267/snowflake2.png",
      "https://assets.codepen.io/3685267/snowflake3.png",
      "https://assets.codepen.io/3685267/snowflake4.png",
      "https://assets.codepen.io/3685267/snowflake5.png",
    ];
    
    sprites.forEach((sprite) => {
      createSnowSet(sprite);
    });
  }

  // 添加飞机效果
  addPlane(scene, uniforms, totalPoints) {
    const vertexShader = `
      attribute float size;
      attribute vec3 customColor;
      varying vec3 vColor;

      void main() {
        vColor = customColor;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    const fragmentShader = `
      uniform vec3 color;
      uniform sampler2D pointTexture;
      varying vec3 vColor;

      void main() {
        gl_FragColor = vec4(vColor, 1.0);
        gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
      }
    `;
    
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ...uniforms,
        pointTexture: {
          value: new THREE.TextureLoader().load("https://assets.codepen.io/3685267/spark1.png"),
        },
      },
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true,
    });

    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];

    const color = new THREE.Color();

    for (let i = 0; i < totalPoints; i++) {
      const [x, y, z] = [rand(-25, 25), 0, rand(-150, 15)];
      positions.push(x);
      positions.push(y);
      positions.push(z);

      color.set(randChoise(["#93abd3", "#f2f4c0", "#9ddfd3"]));
      colors.push(color.r, color.g, color.b);
      sizes.push(1);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute("customColor", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

    const plane = new THREE.Points(geometry, shaderMaterial);
    plane.position.y = -8;
    scene.add(plane);
  }
}
