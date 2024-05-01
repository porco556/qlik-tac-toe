import Square from "./Square"

const boardStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  width: '400px',
  height: '400px',
  border: `15px solid green`,
};

export default function Board({ onMove, boardValues, disabled = false } : { onMove: (id: number) => void, boardValues: number[], disabled: boolean }) {

  const renderBoard = () => {
    const boardSize = 3;
    const cells = [];

    for (let i = 0; i < boardSize * boardSize; i++) {
      cells.push(<Square key={i} id={i} value={boardValues[i]} onMove={onMove} />);
    }

    return <div style={{...boardStyle, borderColor: disabled ? 'lightgreen' : 'green'}}>{cells}</div>;
  }

  return (
    <div>{renderBoard()}</div>
  )
}
