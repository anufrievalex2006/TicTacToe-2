import type { Gender } from "./gender"

export interface RegisterDto {
    name: string
    birthday: string
    gender: Gender
    nickname: string
    password: string
}

export interface LoginDto {
    nickname: string
    password: string
}

export interface TokenResponse {
    token: string
}