import { Box, Button, Container, Modal, Stack, Text, Title } from "@mantine/core"
import { Header } from "../components/header"
import { Board } from "../components/TicTacToe"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TrainPage = () => {
    const nav = useNavigate()
    const [gameResult, setGameResult] = useState<"win" | "draw" | "loss" | null>(null)
    const [showResultModal, setShowResultModal] = useState(false)
    const onGameEnd = async (res: "win" | "draw" | "loss") => {
        setGameResult(res)
        setShowResultModal(true)
    }
    const goToMain = () => {
        setShowResultModal(false)
        nav("/")
    }
    return (
        <Box mih="100vh">
            <Header></Header>
            <Container p={40}>
                <Board onGameEnd={onGameEnd}></Board>
            </Container>
            <Modal title="Игра завершена" centered size="md" opened={showResultModal} onClose={goToMain}>
                {gameResult && (
                    <Stack gap="lg" align="center">
                        {gameResult === "win" && (
                            <Title order={2} c="green">Вы победили</Title>
                        )}
                        {gameResult === "draw" && (
                            <Title order={2}>Ничья</Title>
                        )}
                        {gameResult === "loss" && (
                            <Title order={2} c="red">Вы проиграли</Title>
                        )}
                        <Text size="lg" ta="center" c="dimmed">P.S. Никому ничего не начислено, так как вы в режиме тренировки</Text>
                        <Button onClick={goToMain}>Вернуться на главную</Button>
                    </Stack>
                )}
            </Modal>
        </Box>
    )
}