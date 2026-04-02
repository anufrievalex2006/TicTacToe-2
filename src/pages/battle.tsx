import { Box, Button, Center, Container, Group, Loader, Modal, Stack, Text, Title } from "@mantine/core"
import { Header } from "../components/header"
import { Board } from "../components/TicTacToe"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { User } from "../models/user"
import { api } from "../api/axiosInstance"
import { useState } from "react"

export const BattlePage = () => {
    const nav = useNavigate()
    const [searchParams] = useSearchParams()
    const queryClient = useQueryClient()
    const myId = searchParams.get("myId")
    const contestantId = searchParams.get("contestantId")
    const [gameResult, setGameResult] = useState<"win" | "draw" | "loss" | null>(null)
    const [showResultModal, setShowResultModal] = useState(false)
    const {data: contestant, isLoading, isError} = useQuery<User>({
        queryKey: ["contestant", contestantId],
        queryFn: async () => {
            if (!contestantId)
                throw new Error("No ID provided")
            const res = await api.get<User>(`/users/${contestantId}`)
            return res.data
        },
        enabled: !!contestantId,
        retry: false
    })
    const onGameEnd = async (res: "win" | "draw" | "loss") => {
        if (!contestantId || !myId) {
            console.error("Either my id or contestant's id is missing!")
            return
        }
        setGameResult(res)
        setShowResultModal(true)
        try {
            if (res === "win") {
                await api.post(`/users/${myId}/points`, {
                    points: 3
                })
            }
            else if (res === "draw") {
                await api.post(`/users/${myId}/points`, {
                    points: 1
                })
                await api.post(`/users/${contestantId}/points`, {
                    points: 1
                })
            }
            else {
                await api.post(`/users/${contestantId}/points`, {
                    points: 3
                })
            }
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            })
        }
        catch (error) {
            console.error("Ошибка начисления очков:", error)
        }
    }
    const goToMain = () => {
        setShowResultModal(false)
        nav("/")
    }
    return (
        <Box mih="100vh">
            <Header></Header>
            {isLoading ? (
                <Center py="xl">
                    <Loader size="xl"></Loader>
                </Center>
            ) : (isError || !contestant || !contestantId || !myId) ? (
                <Text c="red" fw={700} ta="center">Ошибка загрузки пользователей</Text>
            ) : (
                <>
                    <Group p="md" justify="center" gap="xl">
                        <Title order={1} c="red">Вы</Title>
                        <Title order={2} fw={700}>VS</Title>
                        <Title order={1} c="blue">{contestant.name}</Title>
                    </Group>
                    <Container p={40}>
                        <Board opponent={contestant} curUserId={myId} onGameEnd={onGameEnd}></Board>
                    </Container>
                    <Modal title="Игра завершена" centered size="md" opened={showResultModal} onClose={goToMain}>
                        {gameResult && (
                            <Stack gap="lg" align="center">
                                {gameResult === "win" && (
                                    <>
                                        <Title order={2} c="green">Вы победили</Title>
                                        <Text size="lg" ta="center">Вам начислено <b>+3</b> очка</Text>
                                    </>
                                )}
                                {gameResult === "draw" && (
                                    <>
                                        <Title order={2}>Ничья</Title>
                                        <Text size="lg" ta="center">Вам и {contestant.name} начислено по <b>+1</b> очку</Text>
                                    </>
                                )}
                                {gameResult === "loss" && (
                                    <>
                                        <Title order={2} c="red">Вы проиграли</Title>
                                        <Text size="lg" ta="center">{contestant.name} начислено <b>+3</b> очка</Text>
                                    </>
                                )}
                                <Button onClick={goToMain}>Вернуться на главную</Button>
                            </Stack>
                        )}
                    </Modal>
                </>
            )}
        </Box>
    )
}