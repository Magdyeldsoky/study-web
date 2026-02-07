import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Float,
    Environment,
    ContactShadows,
    PerspectiveCamera
} from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import {Ship} from "@/components/hero2model/Ship.jsx";

const Hero2Model = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <div className="w-full h-full min-h-[400px] lg:min-h-[550px] relative">
            <Canvas
                dpr={isMobile ? 1 : [1, 1.5]}
                gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                    alpha: true
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={isMobile ? 50 : 40} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#0066ff" />
                <spotLight position={[-10, 10, 10]} angle={0.25} penumbra={1} intensity={1} />

                <Suspense fallback={null}>
                    <Environment preset="city" />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
                        <group scale={isMobile ? 0.45 : 0.65} position={[0, -0.5, 0]}>
                            <Ship/>
                        </group>
                    </Float>

                    {!isMobile && (
                        <ContactShadows
                            position={[0, -2.5, 0]}
                            opacity={0.3}
                            scale={10}
                            blur={2}
                            far={4}
                        />
                    )}
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={0.6}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
};

export default Hero2Model;