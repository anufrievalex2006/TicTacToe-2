import { Button, Group, Stack, Title } from "@mantine/core"
import { useState } from "react"

interface SquareProps {
    value: number
    onSquareClick: () => void
}

const Square = ({value, onSquareClick}: SquareProps) => {
    return (
        <Button w={150} h={150} size={"52px"} onClick={onSquareClick}>{value}</Button>
    )
}

export const Board = () => {
    const [isXNext, setIsXNext] = useState(true)
    const [squares, setSquares] = useState(Array(9).fill(null))
    function handleClick(i: number) {
        if (squares[i])
            return

        const next = squares.slice()
        if (isXNext) next[i] = "X"
        else next[i] = "O"
        setSquares(next)
        setIsXNext(!isXNext)
    }
    const winner = calculateWinner(squares)
    let status
    if (winner) status = (winner === "X") ? "Вы победили!" : "Оппонент победил"
    else status = `Сейчас ход: ${isXNext ? "Ваш" : "оппонента"}`
    return (
        <>
            <Title order={2} ta="center" mb="md">{status}</Title>
            <Stack align="center">
                <Group>
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)}></Square>
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)}></Square>
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)}></Square>
                </Group>
                <Group>
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)}></Square>
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)}></Square>
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)}></Square>
                </Group>
                <Group>
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)}></Square>
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)}></Square>
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)}></Square>
                </Group>
            </Stack>
        </>
    )
}

function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}