# Сервіс з відправки поточного курсу долара

## Особливості

- Отримання поточного курсу обміну доларів (USD) до гривні (UAH).
- Підписка на отримання сповіщень про зміни курсу валют на електронну пошту.
- Сповіщення електронною поштою надсилаються підписаним користувачам раз на день з оновленим курсом валют.

## Функціонал

Відповідно до умови було реалізовано 3 запити:

- /rate - повертає поточний курс обміну доларів (USD) до гривні (UAH).
- /subscibe - підписує певний емейл на розсилку інформації про курс.

## Технології

- Node.js
- Express.js
- MongoDB
- Axios
- Nodemailer
- Jest
- Cron
- Docker

## Завантаження

1. Клонування репозиторію

- `git clone https://github.com/maksym-bohun/CurrencySender.git`

2. Перехід до каталогу проекту

- `cd server`

3. Встановлення залежностей

- `npm install`

4. Налаштування змінних середовища
   Створіть файл .env у кореневому каталозі та надайте такі змінні:

```
PORT=port
DATABASE=mydatabase
DATABASE_PASSWORD=password

EMAIL=email@example.com
EMAIL_APP_PASSWORD=password
```

## Використання

- `docker-compose up -d `
  Доступ до API:
- Отримати поточний обмінний курс: GET /api/rate
- Підписатись, щоб отримувати сповіщення електронною поштою: POST /api/subscribe

## Тестування

- `cd server `
- `npm run test `
