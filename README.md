# TicTacToe
Full-stack Web-приложение с системой пользователей, рейтингом и игровым прогрессом.

## О проекте
Pet-проект, представляющий собой усовершенствованную версию классической игры "Крестики-нолики", которая включает:
- Авторизацию пользователей
- Таблицу лидеров с сортировкой
- Систему рангов и рейтинга
- Адаптивный и комфортный интерфейс
Проект реализован как полноценное full-stack приложение, демонстрирующее разделение клиентской и серверной части и взаимодействие с API.

## Что реализовано
- REST API для работы с пользователями и рейтингом
- Взаимодействие клиента с сервером (TanStack Query, Axios)
- Валидация данных (Zod)
- Хранение и работа с данными в PostgreSQL

## Используемые технологии
**Frontend**:
- React + TypeScript
- React Router
- Mantine UI
- TanStack Query
- Axios
- Zod (валидация)

**Backend**:
- Java + Spring Boot
- PostgreSQL

**Дополнительно**:
- Git

## Инструкция по запуску проекта
### 1. Клонировать репозиторий
```bash
git clone https://github.com/anufrievalex2006/TicTacToe-2.git
cd TicTacToe-2
```
### 2. Настроить Backend
1) Создайте базу данных "tictactoe" в PostgreSQL
2) Настройте подключение к БД в src/main/resources/application.properties
3) Запустите Backend. Можно через IntelliJ IDEA, а можно через командную строку:
```bash
cd backend
mvnw spring-boot:run
```
Backend будет доступен по адресу http://localhost:8080
### 3. Настроить Frontend
*Примечание: если в командной строке Вы находитесь в папке backend, выйдите из нее, используя **cd ..***
```bash
npm install
npm run dev
```
Приложение будет доступно по адресу http://localhost:5173 (или порт, указанный Vite)
