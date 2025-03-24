# Використовуємо офіційний образ Node.js
FROM node:18

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json і package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код у контейнер
COPY . .

ENV APP_PORT=8000


# Створюємо папку для бази SQLite
RUN mkdir -p /app/data

EXPOSE ${APP_PORT}


# Запускаємо сервер
CMD ["npm", "run", "dev"]
