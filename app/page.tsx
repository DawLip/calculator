"use client"

import React from "react";
import { useState } from "react";

import Solver1 from "@/components/Solver1";
import Solver2 from "@/components/Solver2";
export default function Home() {
  const [solveLinear, setSolveLinear] = useState(false);
  return (
    <>
      <button onClick={() => setSolveLinear(!solveLinear)}>
        {solveLinear ? "Równania kwadratowe" : "Równania liniowe"}
      </button>
    <h1>Rozwiązywarka równań</h1>
      {solveLinear ? <Solver1 /> : <Solver2 />}
      
    </>
  );
}
