import { OrbitControls, ContactShadows, Float, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense, memo } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const OptimizedRoom = memo(Room);

const HeroExperience = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

    return (
        <Canvas
            dpr={[1, 1.5]}
            gl={{
                antialias: true,
                powerPreference: "high-performance",
                alpha: true
            }}
        >
            <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={isMobile ? 50 : 40} />

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#3a86ff" />

            <OrbitControls
                enablePan={false}
                enableZoom={false}
                makeDefault
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
            />

            <Suspense fallback={null}>
                <HeroLights />

                <Particles count={isMobile ? 30 : 60} />

                <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
                    <group
                        scale={isMobile ? 0.65 : 0.85}
                        position={isMobile ? [0, -2, 0] : [0, -2.5, 0]}
                        rotation={[0, -Math.PI / 4.5, 0]}
                    >
                        <OptimizedRoom />

                        <ContactShadows
                            position={[0, -0.05, 0]}
                            opacity={0.3}
                            scale={8}
                            blur={1.5}
                            far={2}
                        />
                    </group>
                </Float>
            </Suspense>
        </Canvas>
    );
};

export default HeroExperience;