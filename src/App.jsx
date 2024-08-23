import React, { useState } from 'react';
import './App.css'; 

function App() {
  const MAX_VALUE = 150;
  const MIN_VALUE = 0;

  const [number, setNumber] = useState(0);
  const [history, setHistory] = useState([0]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleIncrement = () => {
    if (number < MAX_VALUE) {
      updateHistory(number + 1);
    }
  };

  const handleDecrement = () => {
    if (number > MIN_VALUE) {
      updateHistory(number - 1);
    }
  };

  const updateHistory = (newNumber) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newNumber];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setNumber(newNumber);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setNumber(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setNumber(history[newIndex]);
    }
  };

  const progressPercentage = (number / MAX_VALUE) * 100;

  return (
    <div className="container">
      <div className="App">
        <h1>Number: {number}</h1>
        <div className="button-group">
          <button onClick={handleDecrement}>Decrement</button>
          <button onClick={handleIncrement}>Increment</button>
        </div>
        <div className="button-group">
          <button onClick={handleUndo} disabled={historyIndex === 0}>Undo</button>
          <button onClick={handleRedo} disabled={historyIndex === history.length - 1}>Redo</button>
        </div>
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%`, transition: 'width 0.3s ease-in-out', }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
