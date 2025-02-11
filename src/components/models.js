import './models.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import pagodaGLB from '../assets/SM_Pagoda.glb';
import customHDRI from '../assets/chinese.exr';
import { RiDragMoveLine } from "react-icons/ri";
import * as THREE from 'three';
import { HueSaturation } from '@react-three/postprocessing';



function Models() {

function Model() {
    const { scene } = useGLTF(pagodaGLB);
    return <primitive object={scene} scale={0.5} castShadow receiveShadow />;
  }


  return (
    <div className="canvas-container">
      <RiDragMoveLine className='rotateIcon'/>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true }} >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <spotLight position={[2, 5, 3]} angle={0.3} intensity={2} castShadow />
        <Model />
        <OrbitControls
                enableDamping
                autoRotate
                autoRotateSpeed={0.5}
                target={[0, 1, 0]}
            />
        <Environment files={customHDRI} background={false} rotation={[0, Math.PI / 2, 0]} />
        <EffectComposer>
        <HueSaturation saturation={0.12} />
          <ToneMapping />
          <Bloom intensity={0.05} luminanceThreshold={0.1} luminanceSmoothing={0.025} radius={0.6} />
        </EffectComposer>
        
      </Canvas>
      
    </div>
  )
}

export default Models;