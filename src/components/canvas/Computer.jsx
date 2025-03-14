import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';


const Computers = () => {

    const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
        <hemisphereLight intensity={3.15} groundColor="black" />
        <pointLight intensity={1}/>
        <primitive
            object={computer.scene}
            scale={0.85}
            position={[0,-3.15,-1.5]}
            rotation={[-0.001, -0.2, -0.1]}
        />
    </mesh>
  )
}

const ComputersCanvas = () => {
    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [20,3,5], fov:25 }}
            gl = {{ preserveDrawingBuffer: true }}
        >
            <Suspense>   
                <OrbitControls 
                    enableZoom={false} 
                    maxPolarAngle={Math.PI/2}
                    minPolarAngle={Math.PI/2}
                />
                <Computers/>
            </Suspense>

            <Preload all/>

        </Canvas>
    )
}

export default ComputersCanvas;