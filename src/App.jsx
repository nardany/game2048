import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cells, setCells] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
  
  return (
    <div className="App">
      {cells.map((num, index) => (
        <div key={index} className="cell">
          {" "}
          C {num}
        </div>
      ))}
    </div>
  );
}

export default App;
