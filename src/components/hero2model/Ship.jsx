import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Ship(props) {
    const { nodes, materials } = useGLTF('/study-web/models/ship.glb')

    const metallicMaterial = new THREE.MeshPhysicalMaterial({
        color: "#222222",
        metalness: 1,
        roughness: 0.15,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
    })

    const glowMaterial = new THREE.MeshStandardMaterial({
        color: "#0077ff",
        emissive: "#0033ff",
        emissiveIntensity: 10,
        toneMapped: false,
    })

    const darkDetailMaterial = new THREE.MeshStandardMaterial({
        color: "#050505",
        roughness: 0.8,
        metalness: 0.2,
    })

    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.022}>
                <group position={[-272.294, -452.838, -101.812]}>
                    <mesh geometry={nodes.Object_4.geometry} material={metallicMaterial} />

                    <mesh geometry={nodes.Object_3.geometry} material={darkDetailMaterial} />

                    <mesh geometry={nodes.Object_5.geometry} material={glowMaterial} />
                    <mesh geometry={nodes.Object_6.geometry} material={glowMaterial} />
                    <mesh geometry={nodes.Object_7.geometry} material={glowMaterial} />
                    <mesh geometry={nodes.Object_8.geometry} material={glowMaterial} />
                    <mesh geometry={nodes.Object_9.geometry} material={glowMaterial} />
                    <mesh geometry={nodes.Object_10.geometry} material={glowMaterial} />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/study-web/models/ship.glb')