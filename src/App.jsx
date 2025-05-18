import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cells, setCells] = useState([
    0, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 0,
  ]);

  let newCells = [...cells];
  let moved = false;
  function addTwo(){
    if (moved) {
      let emptyIndexes = [];
      for (let i = 0; i < newCells.length; i++) {
        if (newCells[i] === 0) {
          emptyIndexes.push(i);
        }
      }

      if (emptyIndexes.length > 0) {
        let randIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        newCells[randIndex] = 2;
      }

      setCells(newCells);
    }
  }

  useEffect(() => {
    function stepLogic(event) {
      if (event.key === "ArrowLeft") {
        for (let i = 0; i < 4; i++) {
          let row = newCells.slice(i * 4, i * 4 + 4).filter((num)=> num !== 0)

          for (let j = 0; j < row.length - 1; j++) {
            if (row[j] === row[j + 1]) {
              row[j] *= 2;
              row[j + 1] = 0;
              moved = true;
            }
          }

          row = row.filter((num)=> num !== 0)
          while (row.length < 4) {
            row.push(0);
          }

          for (let k = 0; k < 4; k++) {
            if (newCells[i * 4 + k] !== row[k]) {
              moved = true;
              newCells[i * 4 + k] = row[k];
            }
          }
        }
        addTwo()
      } 
      else if (event.key === "ArrowRight") {
        for (let i = 0; i < 4; i++) {
          let row = newCells.slice(i * 4, i * 4 + 4).filter((num)=> num !== 0);
          row.reverse();
          for (let j = 0; j < row.length - 1; j++) {
            if (row[j] === row[j + 1]) {
              row[j] *= 2;
              row[j + 1] = 0;
              moved = true;
            }
          }
          row = row.filter((num) => num !== 0);
          while (row.length < 4) {
            row.push(0);
          }
          row.reverse();
          for (let k = 0; k < 4; k++) {
            if (newCells[i * 4 + k] !== row[k]) {
              moved = true;
              newCells[i * 4 + k] = row[k];
            }
          }
        }
        addTwo()
      }
      else if(event.key === "ArrowUp"){
          for(let i = 0;i<4;i++){
            let col = [
              newCells[i],
              newCells[i+4],
              newCells[i+8],
              newCells[i+12],
            ].filter((num)=> num !== 0)

          for (let j = 0; j < col.length - 1; j++) {
            if (col[j] === col[j + 1]) {
              col[j] *= 2;
              col[j + 1] = 0;
              moved = true;
            }
          }
          col = col.filter((num) => num !== 0);
          while (col.length < 4) {
            col.push(0);
          }
          for (let k = 0; k < 4; k++) {
            if (newCells[i + 4 * k] !== col[k]) {
              moved = true;
              newCells[i + 4 * k] = col[k];
            }
          }
          }
          addTwo()
      }
      else if(event.key === "ArrowDown"){
        for(let i = 0;i <4 ; i++){
            let col = [
              newCells[i],
              newCells[i+4],
              newCells[i+8],
              newCells[i+12],
            ].filter((num)=> num !== 0)
            col.reverse()
            for(let j = 0 ; j < col.length -1 ;j++){
              if(col[j] === col[j+1]){
                col[j] *= 2
                col[j+1] = 0
                moved = true
              }
            }
            col = col.filter((num)=> num !== 0)
            while(col.length<4){
              col.push(0)
            }
            for (let k = 0; k < 4; k++) {
              if (newCells[i + 4 * k] !== col[3-k]) {
                moved = true;
                newCells[i + 4 * k] = col[3 - k];
              }
            }
        }
        addTwo()
      }
    }
    window.addEventListener("keydown", stepLogic);
    return () => {
    window.removeEventListener("keydown", stepLogic);
    };
  }, [cells]);

  return (
    <div className="App">
      {cells.map((num, index) => (
        <div key={index} className="cell">
         {num !== 0 ? num : ""}
        </div>
      ))}
    </div>
  );
}

export default App;
