import { useState } from "react";
import Board from "./components/Board";

// Objective (start top to bottom):
// - Figure out if the game is over and whether somebody won
// - Implement the computer making a decent move (can't let player just win)
// - Improve the UI with functionality to ensure nobody can break it
// - What would you do to make this accessibility (WCAG) compliant, or what are some issues you currently see

type Outcome = "Player" | "Computer" | "Nobody";

const tempName: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [disabled, setDisabled] = useState(false);
  const [board, setBoard] = useState<number[]>([
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ]);
  const [outcome, setOutcome] = useState<Outcome | undefined>();

  // back-end code
  const checkWinner = async (board: number[]) => {
    // figure out if the game has been won, and by who...
  };

  // calculate computer's next move
  const calculateMove = async (board: number[]) => {
    setDisabled(true);
    // simulate exciting server action
    await new Promise((resolve) => setTimeout(resolve, 600));

    // add logic here that returns the best computer move (remove temporary logic below once this logic is in place)

    // temporarily return random move by computer
    const availableSpots = board.reduce(
      (acc: number[], currentValue, index) => {
        if (currentValue === -1) {
          acc.push(index);
        }
        return acc;
      },
      []
    );

    const newBoard = [...board];
    const computerMoveIndex = Math.floor(Math.random() * availableSpots.length);
    newBoard[availableSpots[computerMoveIndex]] = 0;

    setDisabled(false);
    return newBoard;
  };

  // back to front-end code
  const onPlayerMoveDone = async (id: number) => {
    const newBoard = [...board];
    newBoard[id] = 1;

    const evenNewerBoard: number[] = await calculateMove(newBoard);
    setBoard(evenNewerBoard);
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
