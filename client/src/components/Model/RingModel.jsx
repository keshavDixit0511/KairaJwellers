import React, { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import style from "../../styles/LandingPage/RingModel.module.css";
import { ContactCon } from "../../Context/ContactContext";

gsap.registerPlugin(ScrollTrigger);

const RingModel = ({ mainContainer }) => {
  const { mountModel } = useContext(ContactCon);
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const dracoLoaderRef = useRef(null);
  const envMapRef = useRef(null);

  const handleResize = () => {
    if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    rendererRef.current.setSize(width, height, false);
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.shadowMap.enabled = false;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // HDRI
    let envMap = null;
    const rgbeLoader = new RGBELoader();
    rgbeLoader
      .setDataType(THREE.FloatType)
      .load(
        "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/hotel_room_1k.hdr",
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = texture;
          envMap = texture;
          envMapRef.current = envMap;
        }
      );

    const topLight = new THREE.DirectionalLight(0xffffff, 1.7);
    topLight.position.set(0, 10, 0);
    topLight.castShadow = true;
    topLight.shadow.mapSize.width = 1024;
    topLight.shadow.mapSize.height = 1024;
    // topLight.shadow.camera.near = 1;
    // topLight.shadow.camera.far = 30;
    // topLight.shadow.camera.left = -10;
    // topLight.shadow.camera.right = 10;
    // topLight.shadow.camera.top = 10;
    // topLight.shadow.camera.bottom = -10;
    scene.add(topLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
    fillLight.position.set(0, 3, 6);
    fillLight.castShadow = false;
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.22);
    scene.add(ambientLight);

    const rimLight = new THREE.PointLight(0xffffff, 0.5, 20);
    rimLight.position.set(-5, 5, 5);
    scene.add(rimLight);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    dracoLoaderRef.current = dracoLoader;

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/ring3.glb",
      (gltf) => {
        const ringModel = gltf.scene;

        ringModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.side = THREE.FrontSide;
              if ("metalness" in child.material) child.material.metalness = 1;
              if ("roughness" in child.material) child.material.roughness = 0.18;
              if ("envMapIntensity" in child.material) child.material.envMapIntensity = 1.5;
              child.material.needsUpdate = true;
            }
          }
        });

        const vw = window.innerWidth;
        let initialPos, initialScale, initialRot, toAnimatePos, toAnimateRot, scrollToPos, scrollToScale, scrollToRot;

        if (vw <= 390) {
          initialPos = { x: -0.5, y: 2, z: 4 };
          initialScale = { x: 13, y: 13, z: 13 };
          initialRot = { x: 0, y: 0, z: 0 };
          toAnimatePos = { x: 0, y: 1.8, z: 0 };
          toAnimateRot = { x: Math.PI / 2, y: 0, z: 0 };
          scrollToPos = { x: 0, y: 1.3, z: 0 };
          scrollToScale = { x: 14, y: 14, z: 14 };
          scrollToRot = { y: -Math.PI / 2 * 0.9, x: Math.PI / 2, z: 0 };
        } else if (vw <= 480) {
          initialPos = { x: -0.5, y: 2, z: 4 };
          initialScale = { x: 12, y: 12, z: 12 };
          initialRot = { x: 0, y: 0, z: 0 };
          toAnimatePos = { x: 0, y: 1.8, z: 0 };
          toAnimateRot = { x: Math.PI / 2, y: 0, z: 0 };
          scrollToPos = { x: 0, y: 0.8, z: 0 };
          scrollToScale = { x: 12, y: 12, z: 12 };
          scrollToRot = { y: -Math.PI / 2 * 0.9, x: Math.PI / 2, z: 0 };
        } else if (vw <= 768) {
          initialPos = { x: -1, y: 2, z: 4.5 };
          initialScale = { x: 15, y: 15, z: 15 };
          initialRot = { x: Math.PI / 2 * 0.8, y: Math.PI / 2 * 4.3, z: Math.PI / 2 * 0.5 };
          toAnimatePos = { x: 0, y: 1.6, z: 0 };
          toAnimateRot = { x: Math.PI / 2 * 0.9, y: 0, z: Math.PI / 2 * 0.1 };
          scrollToPos = { x: 0, y: 1.4, z: 0 };
          scrollToScale = { x: 16, y: 16, z: 16 };
          scrollToRot = { y: -Math.PI / 2 * 0.9, x: Math.PI / 2, z: 0 };
        } else if (vw <= 1024) {
          initialPos = { x: -1, y: 2, z: 4.5 };
          initialScale = { x: 15, y: 15, z: 15 };
          initialRot = { x: Math.PI / 2 * 0.8, y: Math.PI / 2 * 4.3, z: Math.PI / 2 * 0.5 };
          toAnimatePos = { x: 0.2, y: 1.4, z: 0 };
          toAnimateRot = { x: Math.PI / 2 * 0.9, y: 0, z: Math.PI / 2 * 0.1 };
          scrollToPos = { x: 0, y: 1, z: 0 };
          scrollToScale = { x: 16, y: 16, z: 16 };
          scrollToRot = { y: -Math.PI / 2 * 0.9, x: Math.PI / 2, z: 0 };
        } else if (vw <= 1300) {
          initialPos = { x: -1, y: 2, z: 4.5 };
          initialScale = { x: 17, y: 17, z: 17 };
          initialRot = { x: Math.PI / 2 * 0.8, y: Math.PI / 2 * 4.3, z: Math.PI / 2 * 0.5 };
          toAnimatePos = { x: -0.8, y: 1.1, z: 0 };
          toAnimateRot = { x: Math.PI / 2 * 0.9, y: 0, z: Math.PI / 2 * 0.1 };
          scrollToPos = { x: 1.1, y: 0.9, z: 0.5 };
          scrollToScale = { x: 16, y: 16, z: 16 };
          scrollToRot = { y: -Math.PI / 2 * 0.9, x: Math.PI / 2, z: 0 };
        } else {
          initialPos = { x: -2, y: 1, z: 6 };
          initialScale = { x: 16.5, y: 16.5, z: 16.5 };
          initialRot = { x: Math.PI / 2 * 0.7, y: Math.PI / 2 * 1.6, z: 0 };
          toAnimatePos = { x: -1.8, y: 0.7, z: 0 };
          toAnimateRot = { x: Math.PI / 2 * 0.8, y: Math.PI / 2 * 0.3, z: -Math.PI / 2 * 0.1 };
          scrollToPos = { x: 1.5, y: 1, z: 0.5 };
          scrollToScale = { x: 16, y: 16, z: 16 };
          scrollToRot = { y: Math.PI / 2 * 2.5, x: Math.PI / 2 };
        }

        ringModel.position.set(initialPos.x, initialPos.y, initialPos.z);
        ringModel.scale.set(initialScale.x, initialScale.y, initialScale.z);
        ringModel.rotation.set(initialRot.x, initialRot.y, initialRot.z);
        scene.add(ringModel);

        gsap.to(ringModel.position, {
          ...toAnimatePos,
          duration: 1.5,
          ease: "power2.inOut",
        },);

        gsap.to(ringModel.rotation, {
          ...toAnimateRot,
          duration: 1.5,  
          ease: "power2.inOut",
          onComplete: () => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: mainContainer.current,
                start: "top 10%",
                end: "bottom bottom",
                scrub: 2,
              },
            });
            tl.to(ringModel.position, { ...scrollToPos, ease: "power2.inOut" }, 0);
            tl.to(ringModel.rotation, { ...scrollToRot, ease: "power2.inOut" }, 0);
            tl.to(ringModel.scale, { ...scrollToScale, ease: "power2.inOut" }, 0);
          },
        },);
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the model:", error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      // ✅ GSAP cleanup
      gsap.killTweensOf("*");
      ScrollTrigger.killAll();
      ScrollTrigger.refresh();

      // ✅ Remove renderer DOM element
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (
          rendererRef.current.domElement &&
          rendererRef.current.domElement.parentNode
        ) {
          rendererRef.current.domElement.parentNode.removeChild(
            rendererRef.current.domElement
          );
        }
      }

      // ✅ Free DRACO + HDRI memory
      if (dracoLoaderRef.current) {
        dracoLoaderRef.current.dispose();
      }
      if (envMapRef.current) {
        envMapRef.current.dispose();
      }

      // Optional: Reset trigger (if needed)
      // if (typeof reset === "function") reset();
    };
  }, [mountModel]);

  return <div className={style.Canvas_box} ref={mountRef}></div>;
};

export default RingModel;
