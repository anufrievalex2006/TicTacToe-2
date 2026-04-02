import { Box, Center, Container, Loader, Paper, Table, Text, Title } from "@mantine/core"
import { Header } from "../components/header"
import { useQuery } from "@tanstack/react-query"
import { getRank, type User } from "../models/user"
import { api } from "../api/axiosInstance"
import dayjs from "dayjs"

export const LeaderboardPage = () => {
    const {data: users = [], isLoading, isError} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await api.get<User[]>("/users")
            return res.data
        },
        staleTime: 60*1000
    })
    return (
        <Box mih="100vh">
            <Header></Header>
            {isLoading ? (
                <Center py="xl">
                    <Loader size="xl"></Loader>
                </Center>
            ) : (isError) ? (
                <Text c="red" fw={700} ta="center">Ошибка загрузки пользователей</Text>
            ) : (
                <Container p={60}>
                    <Paper bg="#f6f6fb" p="lg">
                        <Title order={2} ta="center">Таблица лидеров</Title>
                        <Text ta="center" fw={700} mb="xl">по данным на {dayjs().format("DD.MM.YYYY, HH:mm:ss")}</Text>
                        <Table withColumnBorders withTableBorder bg="white">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>№</Table.Th>
                                    <Table.Th>Пользователь</Table.Th>
                                    <Table.Th>Очки</Table.Th>
                                    <Table.Th>Ранг</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {users.sort((a,b) => b.points - a.points).map((u,i) => (
                                    <Table.Tr>
                                        <Table.Td>{i + 1}</Table.Td>
                                        <Table.Td>{u.name}</Table.Td>
                                        <Table.Td>{u.points}</Table.Td>
                                        <Table.Td>{getRank(u.points)} dog</Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Paper>
                </Container>
            )}
        </Box>
    )
}