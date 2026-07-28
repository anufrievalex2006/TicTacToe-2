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
2) Скопируйте backend/src/main/resources/application-local.properties.example в backend/src/main/resources/application-local.properties и укажите там свои данные для подключения к БД
3) Запустите Backend с активным профилем "local". Можно через IntelliJ IDEA - в настройках запуска (Run Configuration) добавьте "Active profiles: local". Либо можно через командную строку:
```bash
cd backend
mvnw spring-boot:run -Dspring-boot.run.profiles=local
```
Backend будет доступен по адресу http://localhost:8080
### 3. Настроить Frontend
*Примечание: если в командной строке Вы находитесь в папке backend, выйдите из нее, используя **cd ..***
```bash
npm install
npm run dev
```
Приложение будет доступно по адресу http://localhost:5173 (или порт, указанный Vite)
