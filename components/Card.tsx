"use client"

import React from "react";
import { useState } from "react";


export default function Home({ header, children, fill=false }) {
  const [solveLinear, setSolveLinear] = useState(false);
  
  return (
    <section className={`flex-col ${fill && "grow"} text-3xl text-[#AFAFAF]`}>
      <div className="p-8 bg-primary font-bold rounded-tl-4xl rounded-tr-4xl">{header}</div>
      <div className="grow flex-col p-8 card-bgc">{children}</div>
    </section>
  );
}

const s = {
  selected: "text-[#AFAFAF] border-b"
}