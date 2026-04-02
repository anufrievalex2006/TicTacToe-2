import { Box, Button, Container, Group, Paper, PasswordInput, Select, Stack, TextInput, Title } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { Header } from "../components/header"

export const RegisterPage = () => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <Container p={80}>
                <Paper bg="#f6f6fb" shadow="md" radius="md" withBorder p="lg">
                    <Title order={2} ta="center" mb="lg">Регистрация</Title>
                    <Stack gap="md">
                        <TextInput label="ФИО" c="dimmed"></TextInput>
                        <Group justify="space-between" grow gap="xl">
                            <DateInput label="Дата рождения" c="dimmed"></DateInput>
                            <Select label="Пол" c="dimmed" data={[
                                {
                                    value: "MALE",
                                    label: "Мужской"
                                },
                                {
                                    value: "FEMALE",
                                    label: "Женский"
                                }
                            ]}></Select>
                        </Group>
                        <TextInput label="Никнейм" c="dimmed"></TextInput>
                        <PasswordInput label="Пароль" c="dimmed"></PasswordInput>
                        <Button>Зарегистрироваться</Button>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    )
}