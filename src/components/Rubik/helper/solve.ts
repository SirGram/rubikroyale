import { RubikRotation } from "../entity/cube";
import * as THREE from "three";

export const checkIsSolved = (
  children: THREE.Object3D<THREE.Object3DEventMap>[],
  size: number
): boolean => {
  // Check each face (front, back, up, down, left, right)
  const faces = [
    { index: 2, name: "front", coord: "z", value: size - 1 },
    { index: 2, name: "back", coord: "z", value: 0 },
    { index: 1, name: "up", coord: "y", value: size - 1 },
    { index: 1, name: "down", coord: "y", value: 0 },
    { index: 0, name: "right", coord: "x", value: size - 1 },
    { index: 0, name: "left", coord: "x", value: 0 },
  ];

  for (const face of faces) {
    // Get all cubes on this face
    const faceCubes = children.filter((cube: THREE.Mesh) => {
      const position = cube.position;
      const coords = [position.x, position.y, position.z];
      return Math.round(coords[face.index]) === face.value;
    });

    // Check if all cubes on this face have the same rotation
    const baseRotation = faceCubes[0].rotation;
    const isFaceSolved = faceCubes.every((cube: THREE.Mesh) => {
      return (
        Math.round(cube.rotation.x * 100) ===
          Math.round(baseRotation.x * 100) &&
        Math.round(cube.rotation.y * 100) ===
          Math.round(baseRotation.y * 100) &&
        Math.round(cube.rotation.z * 100) === Math.round(baseRotation.z * 100)
      );
    });

    if (!isFaceSolved) return false;
  }

  return true;
};

export const findSolution = () => {};
