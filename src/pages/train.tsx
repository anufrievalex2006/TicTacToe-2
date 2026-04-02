import { Box, Container } from "@mantine/core"
import { Header } from "../components/header"
import { Board } from "../components/TicTacToe"

export const TrainPage = () => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <Container p={40}>
                <Board></Board>
            </Container>
        </Box>
    )
}