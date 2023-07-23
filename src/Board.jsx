import './Board.css'
import {useState} from "react";

const winningLines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6] // diagonal
]
export default function Board() {

    const [isXNext, setIsXNext] = useState(true)
    const [squares, setSquares] = useState(Array(9).fill(null))

    function handleClick(i) {
        if (squares[i]) return;
        const nextSquares = squares.slice()
        nextSquares[i] = isXNext ? 'X' : 'O';
        setIsXNext(!isXNext);
        setSquares(nextSquares)
        let winner = calculateWinner(nextSquares);
        if (winner) {
            alert(`Winner is ${winner}`)
        }
    }

    // create function to calculate winner
    function calculateWinner(squares) {
        for (let i = 0; i < winningLines.length; i++) {
            const [a, b, c] = winningLines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }
        return null;
    }

    return (
        <div className="board">
            {squares.map((square, index) => (
                <Square value={squares[index]} onSquareClick={() => handleClick(index)}/>))}
        </div>
    )
}

function Square({value, onSquareClick}) {
    return (
        <button
            className="square"
            onClick={onSquareClick}
        >
            <span className='content'> {value} </span>
        </button>
    )
}
