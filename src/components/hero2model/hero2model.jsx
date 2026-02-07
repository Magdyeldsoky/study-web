import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Float,
    Environment,
    ContactShadows,
    PerspectiveCamera,
    useGLTF
} from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import * as THREE from "three";

function ShipModel({ url }) {
    const { nodes, materials } = useGLTF(url);

    useEffect(() => {
        Object.values(materials).forEach((material) => {
            if (material.name === "M_Mat" || material.name === "B_Mat" || material.name === "Material") {
                material.metalness = 1;
                material.roughness = 0.15;
                material.color = new THREE.Color("#0a0a0a");
            }
            if (material.name === "F_Mat" || material.name === "Emission") {
                material.emissive = new THREE.Color("#0066ff");
                material.emissiveIntensity = 12;
                material.toneMapped = false;
            }
        });
    }, [materials]);

    return (
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.022}>
            <group position={[-272.294, -452.838, -101.812]}>
                {Object.keys(nodes).map((key) => {
                    if (nodes[key].type === "Mesh") {
                        return (
                            <mesh
                                key={key}
                                geometry={nodes[key].geometry}
                                material={nodes[key].material}
                                castShadow
                                receiveShadow
                            />
                        );
                    }
                    return null;
                })}
            </group>
        </group>
    );
}

const Hero2Model = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <div className="w-full h-full min-h-[400px] lg:min-h-[550px] relative">
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ antialias: true, exposure: 1.4 }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />

                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} color="#0044ff" intensity={1.5} />

                <Suspense fallback={null}>
                    <Environment preset="city" />

                    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
                        <group scale={isMobile ? 0.45 : 0.6}>
                            <ShipModel url="/study-web/models/ship.glb" />
                        </group>
                    </Float>

                    <ContactShadows
                        position={[0, -2.2, 0]}
                        opacity={0.4}
                        scale={8}
                        blur={2.4}
                        far={4}
                    />
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
};

export default Hero2Model;