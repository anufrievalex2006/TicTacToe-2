import { Box, Container, Paper, Stack, Title, TextInput, PasswordInput, Button } from "@mantine/core"
import { Header } from "../components/header"
import { useNavigate } from "react-router-dom"

export const LoginPage = () => {
    const nav = useNavigate();
    return (
        <Box mih="100vh">
            <Header></Header>
            <Container p={80}>
                <Paper bg="#f6f6fb" shadow="md" radius="md" withBorder p="lg">
                    <Title order={2} ta="center" mb="lg">Вход</Title>
                    <Stack gap="md">
                        <TextInput label="Никнейм" c="dimmed"></TextInput>
                        <PasswordInput label="Пароль" c="dimmed"></PasswordInput>
                        <Button>Войти</Button>
                        <Button variant="light" onClick={() => nav("/register")}>Зарегистрироваться</Button>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    )
}