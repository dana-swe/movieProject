# 🎬 Movies API (SQLite)  

## 📌 Опис  
Цей проєкт — API для керування фільмами, написаний на **Node.js + Express + Sequelize** з базою **SQLite**.  
Він підтримує **реєстрацію користувачів, логін, додавання фільмів, пошук, імпорт з файлу та видалення**.  

---

## 🚀 Запуск у Docker  

### **1️⃣ Клонування репозиторію**  
```sh
git clone https://github.com/YOUR_REPO/movies-api.git
cd movies-api
``` 

### **2️⃣ Налаштування змінних середовища**  
```sh
cp .env.example .env
```

🔹 Відкрий .env та перевір значення:
```sh
DB_STORAGE=data/database.sqlite
JWT_SECRET=your_secret_key
APP_PORT=8000
```
### **3️⃣ Побудова Docker-образу (локально)** 
```sh
docker build -t danaadmin/movies .
```
### **4️⃣ Публікація Docker-образу на Docker Hub** 
```sh
docker login
docker push danaadmin/movies
```
🔗 Docker Hub:  https://hub.docker.com/r/danaadmin/movies

 
### **5️⃣  Запуск програми в один рядок** 
```sh
docker run --name movies -p 8000:8050 -e APP_PORT=8050 danaadmin/movies
```
Локальний доступ: http://localhost:8000

Всередині контейнера програма працює на порту 8050

### **Структура проєкту**
```sh
├── data/                   # SQLite база
├── src/                    # Основна логіка програми
│   ├── config/             # Конфігурація бази даних 
│   ├── controllers/        # Контролери (авторизація, фільми)
│   ├── middleware/         # Middleware для JWT-авторизації
│   ├── models/             # Sequelize моделі: фільми, актори, користувачі
│   ├── routes/             # Маршрути для API
│   ├── utils/              # Парсинг txt-файлів та утиліти
│   ├── app.js              # Ініціалізація Express
│   └── server.js           # Запуск сервера
├── uploads/                # TXT-файли, що імпортуються
├── .env                    # Файл середовища
├── .env.example            # Зразок .env
├── Dockerfile              # Docker конфігурація
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
