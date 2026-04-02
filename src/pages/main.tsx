import { Box, Button, Center, Container, Loader, Paper, Stack, Text, Title } from "@mantine/core"
import { Header } from "../components/header"
import { useQuery } from "@tanstack/react-query"
import type { User } from "../models/user"
import { api } from "../api/axiosInstance"
import { useNavigate } from "react-router-dom"

export const MainPage = () => {
    const nav = useNavigate()
    const {data: user, isLoading, isError} = useQuery<User>({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await api.get<User>("/users/profile")
            return res.data
        },
        enabled: !!localStorage.getItem("token"),
        retry: false
    })
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
                <Container p={40}>
                    <Title order={1}>Добро пожаловать, {user.name} (aka {user.nickname})!</Title>
                    <Paper p="lg" bg="#f6f6fb" mt="xl" withBorder shadow="md">
                        <Title order={2} mb="md">У вас - {user.points} очков</Title>
                        <Stack gap="md">
                            <Button bg="gray" onClick={() => nav("/train")}>Потренироваться</Button>
                            <Button bg="green">Участвовать в баттле</Button>
                        </Stack>
                    </Paper>
                </Container>
            )}
        </Box>
    )
}