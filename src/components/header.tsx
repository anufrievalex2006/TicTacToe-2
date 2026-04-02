import { Anchor, Box, Button, Group, Menu, Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom"
import type { User } from "../models/user";
import { api } from "../api/axiosInstance";

export const Header = () => {
    const nav = useNavigate();
    const {data: profile, isError} = useQuery<User>({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await api.get<User>("/users/profile");
            return res.data;
        },
        retry: false
    })
    const isAuth = !isError && !!profile
    const logout = () => {
        localStorage.removeItem("token");
        nav("/login");
    };
    return (
        <Box bg="blue" c="white" p="sm">
            <Group justify="space-between" px="sm">
                <Group justify="space-between">
                    <Text fw={700} size={"25px"}>TicTacToe v2.0</Text>
                    {isAuth && (
                        <Group gap="md" ml="xl" visibleFrom="sm">
                            <Anchor component={Link} to="/" c="white" underline="never">Главная</Anchor>
                            <Anchor component={Link} to="/leaderboard" c="white" underline="never">Таблица лидеров</Anchor>
                        </Group>
                    )}
                </Group>
                {isAuth ? (
                    <Menu shadow="md" width={200} position="bottom-end">
                        <Menu.Target>
                            <Button variant="transparent" rightSection="\/">
                                <Text c="white" truncate="end">{profile.name}</Text>
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item onClick={() => nav("/profile")}>Профиль</Menu.Item>
                            <Menu.Item color="red" onClick={logout}>Выход</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                ) : (
                    <Button variant="transparent" c="white" onClick={() => nav("/login")}>Вход</Button>
                )}
            </Group>
        </Box>
    )
}