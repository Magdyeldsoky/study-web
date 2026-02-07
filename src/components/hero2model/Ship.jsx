import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Ship(props) {
    const { nodes, materials } = useGLTF('/study-web/models/ship.glb')

    useMemo(() => {
        if (materials.B_Mat) {
            materials.B_Mat.color.set("#050505");
            materials.B_Mat.metalness = 1;
            materials.B_Mat.roughness = 0.2;
        }
        if (materials.M_Mat) {
            materials.M_Mat.color.set("#080808");
            materials.M_Mat.metalness = 1;
            materials.M_Mat.roughness = 0.1;
        }
        if (materials.F_Mat) {
            materials.F_Mat.emissive.set("#0066ff");
            materials.F_Mat.emissiveIntensity = 10;
            materials.F_Mat.toneMapped = false;
        }
    }, [materials]);

    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.022}>
                <group position={[-272.294, -452.838, -101.812]}>
                    <mesh geometry={nodes.Object_3.geometry} material={materials.B_Mat} />
                    <mesh geometry={nodes.Object_4.geometry} material={materials.M_Mat} />
                    <mesh geometry={nodes.Object_5.geometry} material={materials.F_Mat} />
                    <mesh geometry={nodes.Object_6.geometry} material={materials.F_Mat} />
                    <mesh geometry={nodes.Object_7.geometry} material={materials.F_Mat} />
                    <mesh geometry={nodes.Object_8.geometry} material={materials.F_Mat} />
                    <mesh geometry={nodes.Object_9.geometry} material={materials.F_Mat} />
                    <mesh geometry={nodes.Object_10.geometry} material={materials.F_Mat} />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/study-web/models/ship.glb')