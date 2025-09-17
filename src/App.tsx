import { useState } from 'react'
import { Board } from './components/Board';
import { calculateMovePosition } from './utils/CalculateMovePosition';
import './App.css'

function App() {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function handleUndo() {
    if (currentMove > 0) {
      const newHistory = history.slice(0, currentMove);
      setHistory(newHistory);
      setCurrentMove(newHistory.length - 1);
    }
  }

  const moves = history.map((squares, move) => {
    const isCurrent = move === currentMove;
    const description = move > 0 ? `Move #${move}` : 'Game start';
    const movePosition = move > 0 ? calculateMovePosition(history[move-1], squares) : null;

    return (
      <li 
        key={move} 
        className={isCurrent ? 'current-move' : ''}
      >
        {description}
        {movePosition && ` (${movePosition})`}
        {isCurrent && ' (Current)'}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-header">
        <h2>Tic Tac Toe</h2>
        <div className="game-controls">
          <button 
            onClick={handleUndo}
            className="control-button"
            disabled={currentMove === 0}
            aria-label="Undo last move"
          >
            Undo
          </button>
          <button 
            onClick={handleReset}
            className="control-button reset-button"
            aria-label="Reset game"
          >
            Reset Game
          </button>
        </div>
      </div>
      
      <div className="game-content">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        
        <div className="game-info">
          <h3>Game History</h3>
          <div className="history-list-container">
            <ul className="history-list">
              {moves}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
