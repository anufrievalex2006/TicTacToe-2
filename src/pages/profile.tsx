import { Box, Button, Center, Container, Group, Loader, Paper, Select, Stack, Text, TextInput, Title } from "@mantine/core"
import { Header } from "../components/header"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { User } from "../models/user"
import { useEffect, useState } from "react"
import { api } from "../api/axiosInstance"
import { Controller, useForm } from "react-hook-form"
import { profileSchema, type EditProfileFormValues } from "../models/validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { DateInput } from "@mantine/dates"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat)

export const ProfilePage = () => {
    const queryClient = useQueryClient()
    const [serverError, setServerError] = useState<string | null>(null)
    const form = useForm<EditProfileFormValues>({
        defaultValues: ({
            name: "",
            gender: "MALE",
            birthday: "",
            nickname: ""
        }),
        resolver: zodResolver(profileSchema)
    })
    const {data: profile, isLoading, isError} = useQuery<User>({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await api.get<User>("/users/profile")
            return res.data
        }
    })
    useEffect(() => {
        if (profile) {
            form.reset({
                name: profile.name,
                gender: profile.gender,
                birthday: profile.birthday,
                nickname: profile.nickname
            })
        }
    }, [profile, form])
    const onSubmit = async (data: EditProfileFormValues) => {
        try {
            setServerError(null)
            await api.put(`/users/${profile?.id}`, data)
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            })
            queryClient.invalidateQueries({
                queryKey: ["user"]
            })
        }
        catch (error: any) {
            setServerError(error.response?.data?.message || "Error while editing profile")
            console.error("Ошибка изменения профиля:", error)
        }  
    }
    return (
        <Box mih="100vh">
            <Header></Header>
            {isLoading ? (
                <Center py="xl">
                    <Loader size="xl"></Loader>
                </Center>
            ) : (isError || !profile) ? (
                <Text c="red" fw={700} ta="center">Ошибка загрузки профиля</Text>
            ) : (
                <Container p={60}>
                    <Paper p="lg" shadow="md" withBorder bg="#f6f6fb">
                        <Title order={2} ta="center">Информация о профиле</Title>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Stack gap="md">
                                <TextInput label="ФИО" {...form.register("name")} defaultValue={profile.name} c="dimmed" error={form.formState.errors.name?.message}></TextInput>
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
                                {serverError && (
                                    <Text c="red" fw={700}>{serverError}</Text>
                                )}
                                <Button type="submit">Сохранить изменения</Button>
                            </Stack>
                        </form>
                    </Paper>
                </Container>
            )}
        </Box>
    )
}