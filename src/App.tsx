import { Routes, Route } from 'react-router-dom'
import { RegisterPage } from './pages/register'
import { LoginPage } from './pages/login'

export default function App() {
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            <Route path="/" element={<div>Main page</div>}></Route>
            <Route path="*" element={<div>This page does not exist</div>}></Route>
        </Routes>
    )
}