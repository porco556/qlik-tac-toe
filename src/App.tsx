import { useState } from "react";
import Board from "./components/Board";

// Objective (start top to bottom):
// - Figure out if the game is over and whether somebody won
// - Implement the computer making a decent move (can't let player just win)
// - Improve the UI with functionality to ensure nobody can break it
// - What would you do to make this accessibility (WCAG) compliant, or what are some issues you currently see

type Outcome = "Player" | "Computer" | "Nobody";


export const COMPUTER = 0;
export const PLAYER = 1;
export const DRAW = -1;
export const KEEP_PLAYING = 2;

function App() {
  const [disabled, setDisabled] = useState(false);
  const [board, setBoard] = useState<number[]>([
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ]);
  const [outcome, setOutcome] = useState<Outcome | undefined>();

  // back to front-end code
  const onPlayerMoveDone = async (id: number) => {
    const newBoard = [...board];
    newBoard[id] = PLAYER;
    const res = await fetch("http://localhost:8080/board", {
      method:"post", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({board:newBoard})
    });
    const content = await res.json() as {winner: number, board: number[]};
    const evenNewerBoard = content.board;
    
    setBoard(content.board);
    if (content.winner != -1 ){
      setOutcome(content.winner == COMPUTER ?  "Computer" : "Player");
    }
    else{
      setBoard(evenNewerBoard);
    }
    
  };

  return (
    <>
      <div style={{ paddingBottom: "16px" }}>Welcome to Qlik-Tac-Toe!</div>
      <Board
        boardValues={board}
        onMove={onPlayerMoveDone}
        disabled={disabled}
      />
      {outcome && (
        <div style={{ paddingTop: "16px" }}>{outcome} has won the game!!</div>
      )}
    </>
  );
}

export default App;
