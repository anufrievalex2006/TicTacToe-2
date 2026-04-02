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

export const getRank = (points: number) => {
    if (points >= 5000) return 1
    if (points >= 2500) return 2
    if (points >= 1000) return 3
    if (points >= 500) return 4
    if (points >= 250) return 5
    if (points >= 100) return 6
    if (points >= 50) return 7
    if (points >= 25) return 8
    if (points >= 10) return 9
    return 10
}