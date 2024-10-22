"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Cube from "./Cube";
import Rubik, { RubikRef } from "./Rubik";
import { useRef } from "react";


export default function Scene() {
  const rubik = useRef<RubikRef>(null);

  const handleScramble = async () => {
    //random  number between  20 and 30
    const movesCount = Math.floor(Math.random() * 10) + 20;
    rubik.current?.scramble(movesCount)
  }

  return (
    <>
    <Canvas >
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
     
      <OrbitControls />
      
      <Rubik position={[0, 1, 0]} ref={rubik} />
    </Canvas>
      <button onClick={handleScramble}>Scramble</button>
    </>
  );
}
