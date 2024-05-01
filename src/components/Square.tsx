import { useEffect, useState } from "react"

const squareStyle = {
  fontSize: '70px',
  color: 'lightgreen',
  height: '100%',
  width: '100%',
  border: `1px solid green`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

export default function Square({ value, onMove, id }: { value: number, onMove: (id: number) => void, id: number }) {
  const [squareValue, setSquareValue] = useState<number>(value);
  let squareResult;

  const onClick = () => {
    setSquareValue(1);
    onMove(id)
  };

  if (squareValue !== -1) {
    squareResult = squareValue === 0 ? 'O' : 'X';
  }

  useEffect(() => {
    setSquareValue(value);
  }, [value])

  return <div onClick={onClick} style={{...squareStyle}}>{squareResult}</div>
}
