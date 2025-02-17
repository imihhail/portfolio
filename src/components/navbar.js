import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import pagodaGLB from "../assets/ivar3.glb";
import { Canvas, useFrame } from "@react-three/fiber";
import { LoopOnce } from "three";
import "./navbar.css";
import { OrbitControls, useGLTF, Environment, useAnimations } from "@react-three/drei";
import { EffectComposer, Bloom, ToneMapping, HueSaturation } from "@react-three/postprocessing";

function Model({ setModelLoaded }) {
  const { scene, animations } = useGLTF(pagodaGLB);
  const { actions, names } = useAnimations(animations, scene);
  const [modelScale, setModelScale] = useState(1);

  useEffect(() => {
    if (names.length) {
      setModelScale(0.000415 * window.innerWidth);
      const action = actions[names[0]];
      action.setLoop(LoopOnce, 1);
      action.clampWhenFinished = true;
      action.reset();
      action.play();
      setModelLoaded(true);
    }
  }, [actions, names, setModelLoaded]);

  return <primitive object={scene} scale={modelScale} castShadow receiveShadow />;
}

export default function NavBar({ setModelLoaded }) {
  const location = useLocation();
  const [flickering, setFlickering] = useState(false);
  const [flickering2, setFlickering2] = useState(false);
  const [flickering3, setFlickering3] = useState(false);
  const [lineFlash, setLineFlash] = useState(false);

  function flickerCycle() {
    setFlickering(false);
    setFlickering2(false);
    setFlickering3(false);
    setLineFlash(false);
    setTimeout(() => setLineFlash(true), 300);
    setTimeout(() => setFlickering(true), 500);
    setTimeout(() => setFlickering2(true), 700);
    setTimeout(() => setFlickering3(true), 900);
  }

  useEffect(() => {
    const intervalId = setInterval(flickerCycle, 20000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="navSection">
      <div className="leftSection">
        <div className="myName">
          <Canvas shadows camera={{ position: [0, 0, 4.3], fov: 50 }} gl={{ antialias: true }}>
            <Environment preset="sunset" background={false} />
            <Model setModelLoaded={setModelLoaded} />
            <OrbitControls enableDamping autoRotate autoRotateSpeed={0.8} target={[0, 0, 0]} />
            <EffectComposer>
              <HueSaturation saturation={0.15} />
              <ToneMapping />
              <Bloom intensity={0.05} luminanceThreshold={0.1} luminanceSmoothing={0.025} radius={0.6} />
            </EffectComposer>
          </Canvas>
        </div>
      </div>

      <div className="rightSection">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Hom<span className={`${flickering ? "flicker1" : ""}`}>e</span>
        </Link>
        <Link to="/projects" className={location.pathname === "/projects" ? "active" : ""}>
          Projects
        </Link>
        <Link to="/models" className={location.pathname === "/models" ? "active" : ""}>
          3D Model<span className={`${flickering2 ? "flicker2" : ""}`}>s</span>
        </Link>
        <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
          Cont<span className={`${flickering3 ? "flicker3" : ""}`}>a</span>ct
        </Link>
      </div>

      <div className="topLine"></div>
      <div className={`topLineShining ${lineFlash ? "zap" : ""}`}></div>
    </nav>
  );
}
