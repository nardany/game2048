import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cells, setCells] = useState([
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
  ]);

  useEffect(() => {
    let emptyArray = [];

    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === 0) {
        emptyArray.push(i);
      }
    }

    let randomIndex = Math.floor(Math.random() * emptyArray.length);
    let randomIndex2 = Math.floor(Math.random() * emptyArray.length);

    while (randomIndex === randomIndex2) {
      randomIndex2 = Math.floor(Math.random() * emptyArray.length);
    }

    let newCells = [...cells];

    newCells[randomIndex] = 2;
    newCells[randomIndex2] = 2;
    setCells(newCells);
  }, []);

  useEffect(() => {
    function stepLogic(event) {
      let newCells = [...cells];
      let moved = false;

      if (event.key === "ArrowLeft") {
        for (let i = 0; i < 4; i++) {
          let row = newCells.slice(i * 4, i * 4 + 4);
          let cleanedRow = row.filter((num) => num !== 0);

          for (let j = 0; j < cleanedRow.length - 1; j++) {
            if (cleanedRow[j] === cleanedRow[j + 1]) {
              cleanedRow[j] *= 2;
              cleanedRow[j + 1] = 0;
              moved = true;
            }
          }

          cleanedRow = cleanedRow.filter((num) => num !== 0);
          while (cleanedRow.length < 4) {
            cleanedRow.push(0);
          }

          for (let k = 0; k < 4; k++) {
            if (newCells[i * 4 + k] !== cleanedRow[k]) {
              moved = true;
              newCells[i * 4 + k] = cleanedRow[k];
            }
          }
        }

        if (moved) {
          let emptyIndexes = [];
          for (let i = 0; i < newCells.length; i++) {
            if (newCells[i] === 0) {
              emptyIndexes.push(i);
            }
          }

          if (emptyIndexes.length > 0) {
            let randIndex =
              emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
            newCells[randIndex] = 2;
          }

          setCells(newCells);
        }
      } else if (event.key === "ArrowRight") {
        for (let i = 0; i < 4; i++) {
          let row = newCells.slice(i * 4, i * 4 + 4);
          row.reverse();
          let cleanedRow = row.filter((num) => num !== 0);

          for (let j = 0; j < cleanedRow.length - 1; j++) {
            if (cleanedRow[j] === cleanedRow[j + 1]) {
              cleanedRow[j] *= 2;
              cleanedRow[j + 1] = 0;
              moved = true;
            }
          }
          cleanedRow = cleanedRow.filter((num) => num !== 0);
          while (cleanedRow.length < 4) {
            cleanedRow.push(0);
          }
          cleanedRow.reverse();
          for (let k = 0; k < 4; k++) {
            if (newCells[i * 4 + k] !== cleanedRow[k]) {
              moved = true;
              newCells[i * 4 + k] = cleanedRow[k];
            }
          }
        }
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
      else if(event.key === "ArrowUp"){
          for(let i = 0;i<4;i++){
            let col = [
              newCells[i],
              newCells[i+4],
              newCells[i+8],
              newCells[i+12],
            ]
            let cleanedCol = col.filter((num)=> num != 0)

          for (let j = 0; j < cleanedCol.length - 1; j++) {
            if (cleanedCol[j] === cleanedCol[j + 1]) {
              cleanedCol[j] *= 2;
              cleanedCol[j + 1] = 0;
              moved = true;
            }
          }
          cleanedCol = cleanedCol.filter((num) => num !== 0);
          while (cleanedCol.length < 4) {
            cleanedCol.push(0);
          }
          for (let k = 0; k < 4; k++) {
            if (newCells[i + 4 * k] !== cleanedCol[k]) {
              moved = true;
              newCells[i + 4 * k] = cleanedCol[k];
            }
          }
          }
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
            }}
            setCells(newCells);
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
          {" "}
          {num}
        </div>
      ))}
    </div>
  );
}

export default App;
