"use client"
import { useState } from "react";
function Input({value, callback, i, degree}){
  return (
    <>
      <input 
        type="number" 
        value={value} 
        onChange={(e)=>callback(Number(e.target.value))} 
        className="w-10 text-right"
      />
      {i!=degree && <>x<sup>{[0,1,2,3].map((coeff, index)=>(coeff==i && degree-coeff))}</sup></>}
      
    </>
)
}

export default function Solver1() {
  const [degree, setDegree] = useState(1);
  let roots = [];

  const [a, setA] = useState(1);
  const [b, setB] = useState(-6);
  const [c, setC] = useState(11);
  const [d, setD] = useState(-6);


  const inputs = [];
  const coefficientsUpdates = [setA,setB,setC,setD];
  const values = [a,b,c,d];

  for (let i=0; i<degree+1; i++) {
    inputs.push(<Input value={values[i]} callback={coefficientsUpdates[i]} i={i} key={"input"+i} degree={degree}/>)
    if (i!=degree) inputs.push(" + ");
  }

  if(degree==1) { roots.push(-b/a); }
  else if(degree==2) {
    const delta = b**2 - 4*a*c;
    if(delta>0) {
      roots.push((-b - delta**0.5) / (2*a));
      roots.push((-b + delta**0.5) / (2*a));
    } else if(delta==0) {
      roots.push(-b / (2*a));
    }
  } else if(degree==3) {
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q = (2 * b ** 3 - 9 * a * b * c + 27 * a ** 2 * d) / (27 * a ** 3);
    const delta = (q ** 2) / 4 + (p ** 3) / 27;

    if (delta > 0) {
        const u = Math.cbrt(-q / 2 + Math.sqrt(delta));
        const v = Math.cbrt(-q / 2 - Math.sqrt(delta));
        roots.push(u + v - b / (3 * a));
    } else if (delta === 0) {
        const u = Math.cbrt(-q / 2);
        roots.push(2 * u - b / (3 * a), -u - b / (3 * a));
    } else {
        const r = Math.sqrt(0-p ** 3 / 27);
        const phi = Math.acos(0-q / (2 * r));
        const m = 2 * Math.cbrt(r);

        roots.push(m * Math.cos(phi / 3) - b / (3 * a));
        roots.push(m * Math.cos((phi + 2 * Math.PI) / 3) - b / (3 * a));
        roots.push(m * Math.cos((phi + 4 * Math.PI) / 3) - b / (3 * a));
    }
  }

  return (
    <section>
      <h2>Rozwiąż równanie</h2>
      {
        [1,2,3].map(d=>(
          <div key={"degree"+d}>
            <input type="radio" name="degree" checked={degree==d} onChange={()=>setDegree(d)}/> 
            <span>{d} stopnia</span>
          </div>
        ))
      }
      <section>
      {inputs} = 0
      </section>
      <section>
        Rozwiązanie:
        {roots.map((x, index)=>(
          <div key={"x"+index}>x{index+1}: {x}</div>
        ))}
      </section>
    </section>
  );
}