import { Box, Button, Group, Text } from "@mantine/core"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const nav = useNavigate();
    return (
        <Box bg="blue" c="white" p="sm">
            <Group justify="space-between" px="sm">
                <Text fw={700} size={"25px"}>TicTacToe v2.0</Text>
                <Button variant="transparent" c="white" onClick={() => nav("/login")}>Вход</Button>
            </Group>
        </Box>
    )
}