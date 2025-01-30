import './models.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import pagodaGLB from '../assets/pagoda.glb'; // Make sure you have this file


function Models() {

    function Model() {
        const { scene } = useGLTF(pagodaGLB);
        return <primitive object={scene} scale={0.5} castShadow receiveShadow />;
      }


      return (
        <div className="canvas-container">
          <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
            <spotLight position={[2, 5, 3]} angle={0.3} intensity={2} castShadow />
            
            {/* 3D Model */}
            <Model />
    
            {/* Effects */}
            <OrbitControls enableDamping autoRotate autoRotateSpeed={0.5} />
            <Environment preset="forest" background />
            <EffectComposer>
              <ToneMapping />
              <Bloom intensity={0.3} luminanceThreshold={0.2} />
            </EffectComposer>
          </Canvas>
        </div>
      );
      
}

export default Models;