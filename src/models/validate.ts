import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(1, "Введите ФИО").max(100),
    gender: z.enum(["MALE", "FEMALE"]),
    birthday: z.string()
        .refine((x) => !x || !isNaN(Date.parse(x)), {
            error: "Некорректная дата рождения"
        }),
    nickname: z.string().min(1, "Введите никнейм").max(100),
    password: z.string().min(6, "Пароль должен быть длиной не менее 6 символов")
})

export const loginSchema = z.object({
    nickname: z.string().min(1, "Введите никнейм").max(100),
    password: z.string().min(1, "Введите пароль")
});

export type RegisterFormValues = z.infer<typeof registerSchema>
export type LoginFormValues = z.infer<typeof loginSchema>