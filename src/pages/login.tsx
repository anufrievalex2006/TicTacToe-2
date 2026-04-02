import { Box, Container, Paper, Stack, Title, TextInput, PasswordInput, Button, Text } from "@mantine/core"
import { Header } from "../components/header"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { type LoginFormValues, loginSchema } from "../models/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/axiosInstance";
import type { TokenResponse } from "../models/auth";
import { useState } from "react";

export const LoginPage = () => {
    const nav = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null)
    const form = useForm<LoginFormValues>({
        defaultValues: ({
            nickname: "",
            password: ""
        }),
        resolver: zodResolver(loginSchema)
    })
    const onSubmit = async (data: LoginFormValues) => {
        try {
            setServerError(null)
            const res = await api.post<TokenResponse>("/login", data)
            const token = res.data.token;
            localStorage.setItem("token", token)
            nav("/")
        }
        catch (error: any) {
            setServerError(error.response?.data?.message || "Invalid email and/or password")
            console.error("Ошибка входа:", error)
        }
    }
    return (
        <Box mih="100vh">
            <Header></Header>
            <Container p={80}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Paper bg="#f6f6fb" shadow="md" radius="md" withBorder p="lg">
                        <Title order={2} ta="center" mb="lg">Вход</Title>
                        <Stack gap="md">
                            <TextInput {...form.register("nickname")} label="Никнейм" c="dimmed" error={form.formState.errors.nickname?.message}></TextInput>
                            <PasswordInput {...form.register("password")} label="Пароль" c="dimmed" error={form.formState.errors.password?.message}></PasswordInput>
                            {serverError && (
                                <Text c="red" fw={700}>
                                    {serverError}
                                </Text>
                            )}
                            <Button type="submit">Войти</Button>
                            <Button variant="light" onClick={() => nav("/register")}>Зарегистрироваться</Button>
                        </Stack>
                    </Paper>
                </form>
            </Container>
        </Box>
    )
}