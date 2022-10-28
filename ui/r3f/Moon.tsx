import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

export function Moon() {
  const { nodes, materials } = useGLTF('/textures/moon.glb')
  const moonRef = useRef()
  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.001
    }
  })

  return (
    <group
      dispose={null}
      position={[2, 0, 0]}
      rotation={[Math.PI / 6, 0, 0]}
      ref={moonRef}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={2.25}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/textures/moon.glb')
