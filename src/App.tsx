import { Routes, Route } from 'react-router-dom'
import { RegisterPage } from './pages/register'
import { LoginPage } from './pages/login'
import { ProtectedRoute } from './components/ProtectedRoute'
import { MainPage } from './pages/main'

export default function App() {
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            <Route path="/" element={<ProtectedRoute><MainPage></MainPage></ProtectedRoute>}></Route>
            <Route path="*" element={<div>This page does not exist</div>}></Route>
        </Routes>
    )
}