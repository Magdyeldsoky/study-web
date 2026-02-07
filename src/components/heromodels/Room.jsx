import React, { useRef, useMemo } from "react";
import { useGLTF, useTexture, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import * as THREE from "three";

export function Room(props) {
    const { nodes, materials } = useGLTF("/study-web/models/optimized-room.glb");

    const matcapTexture = useTexture("/study-web/images/textures/mat1.png");

    const materialsPBR = useMemo(() => ({
        curtain: new THREE.MeshStandardMaterial({
            color: "#d90429",
            roughness: 0.8,
            emissive: "#300000",
            emissiveIntensity: 0.2,
        }),
        body: new THREE.MeshStandardMaterial({
            map: matcapTexture,
            roughness: 0.2,
            metalness: 0.8,
        }),
        table: new THREE.MeshStandardMaterial({
            color: "#3d1c02",
            roughness: 0.4,
            metalness: 0.1,
        }),
        chair: new THREE.MeshStandardMaterial({
            color: "#111",
            roughness: 0.3,
            metalness: 0.2,
        }),
        pillow: new THREE.MeshStandardMaterial({
            color: "#8338ec",
            roughness: 0.9,
        }),
        screenNeon: new THREE.MeshStandardMaterial({
            color: "#000",
            emissive: "#3a86ff",
            emissiveIntensity: 5,
            roughness: 0.1,
        }),
        glass: new THREE.MeshStandardMaterial({
            color: "#fff",
            transparent: true,
            opacity: 0.3,
            roughness: 0,
            metalness: 1,
        })
    }), [matcapTexture]);

    return (
        <group {...props} dispose={null}>
            <EffectComposer disableNormalPass>
                <Bloom
                    intensity={0.5}
                    luminanceThreshold={1}
                    mipmapBlur
                />
                <ToneMapping />
            </EffectComposer>

            <mesh geometry={nodes._________6_blinn1_0.geometry} material={materialsPBR.curtain} />
            <mesh geometry={nodes.body1_blinn1_0.geometry} material={materialsPBR.body} />
            <mesh geometry={nodes.cabin_blinn1_0.geometry} material={materialsPBR.table} />
            <mesh geometry={nodes.chair_body_blinn1_0.geometry} material={materialsPBR.chair} />

            <mesh geometry={nodes.comp_blinn1_0.geometry} material={materialsPBR.body} />
            <mesh geometry={nodes.emis_lambert1_0.geometry} material={materialsPBR.screenNeon} />
            <mesh geometry={nodes.monitor2_blinn1_0.geometry} material={materialsPBR.screenNeon} />
            <mesh geometry={nodes.monitor3_blinn1_0.geometry} material={materialsPBR.screenNeon} />

            <mesh geometry={nodes.pillows_blinn1_0.geometry} material={materialsPBR.pillow} />

            <mesh geometry={nodes.handls_blinn1_0.geometry} material={materials.blinn1} />
            <mesh geometry={nodes.keyboard_blinn1_0.geometry} material={materials.blinn1} />
            <mesh geometry={nodes.kovrik_blinn1_0.geometry} material={materials.blinn1} />
            <mesh geometry={nodes.lamp_bl_blinn1_0.geometry} material={materialsPBR.screenNeon} />

            <mesh geometry={nodes.table_blinn1_0.geometry} material={materialsPBR.table} />

            <mesh geometry={nodes.window_blinn1_0.geometry} material={materialsPBR.glass} />
            <mesh geometry={nodes.window4_phong1_0.geometry} material={materialsPBR.glass} />

            <mesh geometry={nodes.radiator_blinn1_0.geometry} material={new THREE.MeshStandardMaterial({ color: "#eee" })} />
        </group>
    );
}

useGLTF.preload("/study-web/models/optimized-room.glb");