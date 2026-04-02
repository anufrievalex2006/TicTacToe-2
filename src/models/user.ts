import type { Gender } from "./gender"

export interface User {
    id: string
    name: string
    birthday: string
    gender: Gender
    nickname: string
    points: number
}

export interface UserUpdateDto {
    name: string
    birthday: string
    gender: Gender
    nickname: string
}