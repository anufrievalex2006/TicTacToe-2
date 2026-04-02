import { Box, Button, Center, Container, Group, Loader, Modal, Paper, Stack, Text, Title } from "@mantine/core"
import { Header } from "../components/header"
import { useQuery } from "@tanstack/react-query"
import type { User } from "../models/user"
import { api } from "../api/axiosInstance"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const MainPage = () => {
    const nav = useNavigate()
    const [opponent, setOpponent] = useState<User | null>(null)
    const [modalOpened, setModalOpened] = useState(false)
    const {data: user, isLoading, isError} = useQuery<User>({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await api.get<User>("/users/profile")
            return res.data
        },
        enabled: !!localStorage.getItem("token"),
        retry: false
    })
    const {data: allUsers = []} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await api.get<User[]>("/users")
            return res.data.filter(u => u.id !== user?.id)
        },
        enabled: !!user
    })
    const chooseOpponent = () => {
        if (!user || allUsers.length === 0) return

        const selected = allUsers[Math.floor(Math.random()*allUsers.length)]
        setOpponent(selected)
        setModalOpened(true)
    }
    const start = () => {
        if (!opponent || !user) return

        setModalOpened(false)
        nav(`/practice?myId=${user.id}&contestantId=${opponent.id}`)
    }
    const closeModal = () => {
        setModalOpened(false)
        setOpponent(null)
    }
    return (
        <Box mih="100vh">
            <Header></Header>
            {isLoading ? (
                <Center py="xl">
                    <Loader size="xl"></Loader>
                </Center>
            ) : (isError || !user) ? (
                <Text c="red" fw={700} ta="center">Ошибка загрузки пользователя</Text>
            ) : (
                <>
                    <Container p={40}>
                        <Title order={1}>Добро пожаловать, {user.name} (aka {user.nickname})!</Title>
                        <Paper p="lg" bg="#f6f6fb" mt="xl" withBorder shadow="md">
                            <Title order={2} mb="md">У вас - {user.points} очков</Title>
                            <Stack gap="md">
                                <Button bg="gray" onClick={() => nav("/train")}>Потренироваться</Button>
                                <Button bg="green" onClick={chooseOpponent} loading={isLoading}>Участвовать в баттле</Button>
                            </Stack>
                        </Paper>
                    </Container>
                    <Modal title="Мы нашли Вам соперника!" centered size="md" opened={modalOpened} onClose={closeModal}>
                        {opponent && (
                            <Stack gap="lg">
                                <Text size="lg" ta="center">
                                    Вы играете против
                                </Text>
                                <Text size="xl" fw={700} ta="center" c="blue">
                                    {opponent.name} (aka {opponent.nickname})
                                </Text>
                                <Group grow mt="md">
                                    <Button variant="default" onClick={closeModal}>Отмена</Button>
                                    <Button color="orange" onClick={start}>Начать!</Button>
                                </Group>
                            </Stack>
                        )}
                    </Modal>
                </>
            )}
        </Box>
    )
}