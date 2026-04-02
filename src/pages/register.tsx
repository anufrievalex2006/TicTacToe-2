import { Box, Button, Container, Group, Paper, PasswordInput, Select, Stack, Text, TextInput, Title } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { Header } from "../components/header"
import { useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { registerSchema, type RegisterFormValues } from "../models/validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "../api/axiosInstance"
import type { TokenResponse } from "../models/auth"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

dayjs.extend(customParseFormat);

export const RegisterPage = () => {
    const nav = useNavigate()
    const queryClient = useQueryClient()
    const [serverError, setServerError] = useState<string | null>(null)
    const form = useForm<RegisterFormValues>({
        defaultValues: ({
            name: "",
            gender: "MALE",
            birthday: "",
            nickname: "",
            password: ""
        }),
        resolver: zodResolver(registerSchema)
    })
    const onSubmit = async (data: RegisterFormValues) => {
        try {
            setServerError(null)
            const res = await api.post<TokenResponse>("/register", data)
            const token = res.data.token
            localStorage.setItem("token", token)
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            })
            nav("/")
        }
        catch (error: any) {
            setServerError(error.response?.data?.message || "Validation error")
            console.error("Ошибка регистрации:", error)
        }
    }
    return (
        <Box mih="100vh">
            <Header></Header>
            <Container p={80}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Paper bg="#f6f6fb" shadow="md" radius="md" withBorder p="lg">
                        <Title order={2} ta="center" mb="lg">Регистрация</Title>
                        <Stack gap="md">
                            <TextInput {...form.register("name")} error={form.formState.errors.name?.message} label="ФИО" c="dimmed"></TextInput>
                            <Group justify="space-between" grow gap="xl">
                                <Controller control={form.control} name="birthday" render={({field: {onChange, value}}) => (
                                    <DateInput value={value || null} onChange={
                                        (x) => onChange(x ? dayjs(x).startOf("day").format("YYYY-MM-DD") : "")
                                    } label="Дата рождения" c="dimmed" locale="ru" valueFormat="DD.MM.YYYY" dateParser={
                                        (x) => dayjs(x, "DD.MM.YYYY").toDate()
                                    }></DateInput>
                                )}></Controller>
                                <Controller control={form.control} name="gender" render={({field}) => (
                                    <Select label="Пол" c="dimmed" data={[
                                        {
                                            value: "MALE",
                                            label: "Мужской"
                                        },
                                        {
                                            value: "FEMALE",
                                            label: "Женский"
                                        }
                                    ]} {...field} error={form.formState.errors.gender?.message}></Select>
                                )}></Controller>
                            </Group>
                            <TextInput {...form.register("nickname")} label="Никнейм" c="dimmed"></TextInput>
                            <PasswordInput {...form.register("password")} label="Пароль" c="dimmed"></PasswordInput>
                            {serverError && (
                                <Text c="red" fw={700}>{serverError}</Text>
                            )}
                            <Button type="submit">Зарегистрироваться</Button>
                        </Stack>
                    </Paper>
                </form>
            </Container>
        </Box>
    )
}