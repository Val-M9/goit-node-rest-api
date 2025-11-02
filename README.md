### Скопіюйте вміст файлу `.example.env` в файл `.env` та відредагуйте строки під'єднання до баз даних відповідно до ваших значень DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT

## Production mode

1. Створити базу даних на [Render](https://render.com/) та підключитися до неї через pgAdmin або DBeaver.
2. У базі додати таблицю `contacts` з полями:

```javascript
id: {
  type: uuid,
  primary Key: true,
  not NULL: true,
},
name: {
  type: VARCHAR(),
  not NULL: true,
},
email: {
  type: VARCHAR(),
  not NULL: true,
},
phone: {
  type: VARCHAR(),
  not NULL: true,
},
favorite: {
  type: boolean,
  default: false,
},
```

3. Команда `npm start` запускає проект.

## Developer mode

1. Створити базу даних локально через за допомогою PostgreSQL та під'єднатися до неї.
2. Створити в базі таблицю `contacts` з полями вказаними вище.
3. Для запуску проекту `npm run dev`
