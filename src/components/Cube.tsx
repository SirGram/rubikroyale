import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { GLTF } from "three-stdlib";
import * as THREE from "three";


type Faces =
  | "front"
  | "back"
  | "up"
  | "down"
  | "right"
  | "left"
  | "netral"
  | null;
type Props = GroupProps & {
  faces: Faces[];
};

export default function Cube({ faces, ...props }: Props) {
  const group = useRef();
  const cubeSize= 1.95;

  const materials = useMemo(() => ({
    base: new THREE.MeshStandardMaterial({ color: "black" }), // neutral faces
    front: new THREE.MeshStandardMaterial({ color: 0xff0000 }), // Red
    back: new THREE.MeshStandardMaterial({ color: 0x00ff00 }), // Green
    up: new THREE.MeshStandardMaterial({ color: 0xffffff }), // White
    down: new THREE.MeshStandardMaterial({ color: 0xffff00 }), // Yellow
    right: new THREE.MeshStandardMaterial({ color: 0xff8000 }), // Orange
    left: new THREE.MeshStandardMaterial({ color: 0x0000ff }), // Blue
  }), []);

  const cubeMaterials = useMemo(() => [
    faces.includes("right") ? materials.right : materials.base,
    faces.includes("left") ? materials.left : materials.base,
    faces.includes("up") ? materials.up : materials.base,
    faces.includes("down") ? materials.down : materials.base,
    faces.includes("front") ? materials.front : materials.base,
    faces.includes("back") ? materials.back : materials.base,
  ], [faces, materials]);

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh material={cubeMaterials} >
        <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      </mesh>
    </group>
  );
}

