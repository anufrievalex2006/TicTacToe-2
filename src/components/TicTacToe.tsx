import { Button, Group, Stack, Title } from "@mantine/core"
import { useEffect, useState, useRef } from "react"
import type { User } from "../models/user"

interface SquareProps {
    value: string | null
    onSquareClick: () => void
}

interface BoardProps {
    opponent?: User
    curUserId?: string
    onGameEnd?: (result: "win" | "draw" | "loss") => void
}

const Square = ({value, onSquareClick}: SquareProps) => {
    return (
        <Button w={150} h={150} size={"52px"} onClick={onSquareClick}>{value}</Button>
    )
}

export const Board = ({opponent, curUserId, onGameEnd}: BoardProps) => {
    const [isXNext, setIsXNext] = useState(true)
    const [squares, setSquares] = useState(Array(9).fill(null))
    const hasEnded = useRef(false)

    const contestant = opponent?.name || "Оппонент"
    function handleClick(i: number) {
        if (squares[i] !== null) return
        if (calculateWinner(squares) !== null) return

        const next = [...squares]
        next[i] = isXNext ? "X" : "O"
        setSquares(next)
        setIsXNext(!isXNext)
    }
    const winner = calculateWinner(squares)
    const isDraw = !winner && squares.every(c => c !== null)

    let res: "win" | "draw" | "loss" | null = null
    if (winner) res = (winner === "X") ? "win" : "loss"
    else if (isDraw) res = "draw"

    useEffect(() => {
        if (res && onGameEnd && !hasEnded.current) {
            hasEnded.current = true
            const timer = setTimeout(() => {
                onGameEnd(res!)
            }, 700)
            return () => clearTimeout(timer)
        }
    }, [res, onGameEnd])

    let status = ""
    if (winner) status = (winner === "X") ? "Вы победили!" : `${contestant} победил`
    else if (isDraw) status = "Ничья!"
    else status = `Сейчас ход: ${isXNext ? "Ваш" : contestant}`
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