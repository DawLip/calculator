"use client"
import { useState } from "react";
function Input({values, value, callback, i, n}){
  return (
    <>
      <input 
        type="number" 
        value={value} 
        onChange={(e)=>{
          const x = [...values]
          x[i] = e.target.value
          callback(x)
        }} 
        className="w-10 text-right"
      />
      {i<n && ["a", "b", "c", "d"][i]}
    </>
)
}

function gaussJordan(A, B) {
  const n = A.length;
  
  // Tworzymy rozszerzoną macierz [A | B]
  let augmentedMatrix = A.map((row, i) => [...row, B[i]]);
  
  // Przeprowadzamy eliminację Gaussa
  for (let i = 0; i < n; i++) {
      // Szukamy największego elementu w kolumnie (aby uniknąć dzielenia przez 0)
      let maxRow = i;
      for (let j = i + 1; j < n; j++) {
          if (Math.abs(augmentedMatrix[j][i]) > Math.abs(augmentedMatrix[maxRow][i])) {
              maxRow = j;
          }
      }
      
      // Zamieniamy wiersze
      [augmentedMatrix[i], augmentedMatrix[maxRow]] = [augmentedMatrix[maxRow], augmentedMatrix[i]];
      
      // Dzielimy wiersz przez element diagonalny
      let pivot = augmentedMatrix[i][i];
      for (let j = 0; j <= n; j++) {
          augmentedMatrix[i][j] /= pivot;
      }

      // Eliminuje pozostałe elementy w tej samej kolumnie
      for (let j = 0; j < n; j++) {
          if (j !== i) {
              let factor = augmentedMatrix[j][i];
              for (let k = 0; k <= n; k++) {
                  augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
              }
          }
      }
  }

  // Zwracamy rozwiązanie X (niewiadome)
  return augmentedMatrix.map(row => row[n]);
}

export default function Solver2() {
  const [n, setN] = useState(1);
  let solves = [];

  const [e1, setE1] = useState([]);
  const [e2, setE2] = useState([]);
  const [e3, setE3] = useState([]);
  const [e4, setE4] = useState([]);
  const [e5, setE5] = useState([]);

  const EUpdates = [setE1,setE2,setE3,setE4,setE5];
  const inputRows=[]

  for (let i=0; i<n; i++) {
    const row = []
    for (let j=0; j<n+1; j++) {
      row.push(<Input values={[e1,e2,e3,e4,e5][i]} value={[e1,e2,e3,e4,e5][i][j]} callback={EUpdates[i]} i={j} key={"input"+i+j} n={n}/>)
      if (j<n) row.push(" + ");
      else if (j==n) row.push(" = 0");
    }
    inputRows.push(<div key={"plus"+i}>{row}</div>)
  }

  const A = [e1,e2,e3,e4,e5].filter((e, i) => i<n).map(row=>row.slice(0,n))
  const B = [e1,e2,e3,e4,e5].filter((e, i) => i<n).map(row=>row[n])

  solves = gaussJordan(A, B)

  return (
    <section>
      <h2>Rozwiąż układ równań liniowych</h2>
      {
        [1,2,3,4].map(nn=>(
          <div key={"n"+nn}>
            <input type="radio" name="degree" checked={n==nn} onChange={()=>{
              setE1(new Array(nn+1).fill(1))
              setE2(new Array(nn+1).fill(1))
              setE3(new Array(nn+1).fill(1))
              setE4(new Array(nn+1).fill(1))
              setE5(new Array(nn+1).fill(1))
              setN(nn)
              }}/> 
            <span> {nn} niewiadome</span>
          </div>
        ))
      }
      <section>
      {inputRows}
      </section>
      <section>
        Rozwiązanie:
        {solves.filter(x=>isNaN(x)).length==0 ? ["a", "b", "c", "d"].filter((x, index)=>index<n).map((x, index)=>(
          <div key={"x"+index}>{x}: {solves[index]}</div>
        )) : " Brak rozwiązania lub nieskończenie wiele rozwiązań"}
      </section>
    </section>
  );
}
