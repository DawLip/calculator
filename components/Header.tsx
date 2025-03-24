"use client"

import React from "react";
import { useState } from "react";


export default function Home({ menuItem = "linear" }) {
  return (
    <section className="grow-0 justify-between px-16 text-[#AFAFAF] header-bgc">
      <div className="p-4 text-5xl font-bold">
        <span className="text-primary ">Eq</span>Solver
      </div>
      <ul className="flex text-3xl font-bold">
        <a href="/" className="flex">
          <li className={`flex px-16 items-center text-[#888] ${menuItem == "linear" ? s.selected : ""} hover:bg-[#0005] hover:text-[$#AFAFAF`}>Linear</li>
        </a>
        <a href="/polynomial" className="flex">
          <li className={`flex px-16 items-center text-[#888] ${menuItem == "polynomial" ? s.selected : ""} hover:bg-[#0005] hover:text-[#AFAFAF]`}>Polynomial</li>
        </a>
      </ul>
    </section>
  );
}

const s = {
  selected: "text-[#AFAFAF] border-b"
}