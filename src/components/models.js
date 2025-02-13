import React, { useState, Suspense } from 'react';
import './models.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, useProgress } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping, HueSaturation } from '@react-three/postprocessing';
import pagodaGLB from '../assets/SM_Pagoda.glb';
import bell from '../assets/bell.jpg';
import closerLook from '../assets/closer.jpg';
import sunSet from '../assets/sunSet.jpg';
import wireFrame from '../assets/wireFrame.png';
import customHDRI from '../assets/garden.exr';
import { RiDragMoveLine } from "react-icons/ri";
import { SiUnrealengine } from "react-icons/si";
import { BiLogoBlender } from "react-icons/bi";
import { ImEnlarge } from "react-icons/im";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="loader">

      </div>
      <div className="loaderr">
        {progress.toFixed(0)}% loaded
      </div>
    </Html>
  );
}

function Model() {
  const { scene } = useGLTF(pagodaGLB);
  return <primitive object={scene} scale={0.5} castShadow receiveShadow />;
}

function Models() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleMouseDown = (event) => {
    if (event.button === 0 || event.button === 2) {
      setIsMouseDown(true);
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
  };

  const handleImageClick = (src, alt) => {
    setSelectedImage({ src, alt });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className='modelsContainer'>
      <div
        className="canvas-container"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {!isMouseDown && <RiDragMoveLine className="rotateIcon" />}
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={3} castShadow />
          <spotLight position={[2, 5, 3]} angle={0.3} intensity={2} castShadow />
          
          {/* Wrap the Model with Suspense and show Loader until it's ready */}
          <Suspense fallback={<Loader />}>
            <Model />
          </Suspense>
          
          <OrbitControls
            enableDamping
            autoRotate
            autoRotateSpeed={0.5}
            target={[0, 1, 0]}
          />
          <Environment files={customHDRI} background={false} />
          <EffectComposer>
            <HueSaturation saturation={0.15} />
            <ToneMapping />
            <Bloom
              intensity={0.05}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.025}
              radius={0.6}
            />
          </EffectComposer>
        </Canvas>
      </div>
      
      <div className='imageContainer'>
        <div className='imageText'>
          <p>Japanese pagoda inspired by Chureito pagoda near Mount Fuji.</p>
          <p className='loweText'> Model made with <b>Blender</b> and textured with <b>Adobe Substance Painter</b>. Images are taken in <b>Unreal Engine</b>. </p>
        </div>
        <div className='images'>
          <div className="imageWithIcon" onClick={() => handleImageClick(bell, "Bell")}>
            <img src={bell} alt="Bell" />
            <ImEnlarge className="enlargeIcon" />
          </div>
          <div className="imageWithIcon" onClick={() => handleImageClick(closerLook, "Closer Look")}>
            <img src={closerLook} alt="Closer Look" />
            <ImEnlarge className="enlargeIcon" />
          </div>
          <div className="imageWithIcon" onClick={() => handleImageClick(sunSet, "Sun Set")}>
            <img src={sunSet} alt="Sun Set" />
            <ImEnlarge className="enlargeIcon" />
          </div>
        </div>
        {selectedImage && (
          <div className="modal" onClick={handleCloseModal}>
            <img src={selectedImage.src} alt={selectedImage.alt} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Models;
