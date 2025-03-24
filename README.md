# 🎬 Movies API (SQLite)  

## 📌 Description.   
This project is a movie management API written in **Node.js + Express + Sequelize** with a **SQLite** database.  
It supports **user registration, login, adding movies, searching, importing from file, and deleting**.  

---

## 🚀 Running in Docker    

### **1️⃣ Clone the repository**  
```sh
git clone https://github.com/YOUR_REPO/movies-api.git
cd movies-api
``` 

### **2️⃣ Setting up environment variables**  
```sh
cp .env.example .env
```

🔹 Open the .env and check the values:
```sh
DB_STORAGE=data/database.sqlite
JWT_SECRET=your_secret_key
APP_PORT=8000
```
### **3️⃣ Building a Docker image (locally)** 
```sh
docker build -t danaadmin/movies .
```
### **4️⃣ Publishing a Docker image on the Docker Hub** 
```sh
docker login
docker push danaadmin/movies
```
🔗 Docker Hub:  https://hub.docker.com/r/danaadmin/movies

 
### **5️⃣  Run the program in one line** 
```sh
docker run --name movies -p 8000:8050 -e APP_PORT=8050 danaadmin/movies
```
Local access: http://localhost:8000

Inside the container, the program runs on port 8050

### **Project structure**
```sh
├── data/                   # SQLite Database 
├── src/                    # The main logic of the program
│   ├── config/             # Database configuration 
│   ├── controllers/        # Controllers (authorization, movies)
│   ├── middleware/         # Middleware for JWT-authorization
│   ├── models/             # Sequelize models: movies, actors, users
│   ├── routes/             # Routes for the API
│   ├── utils/              # Parsing of txt files and utility
│   ├── app.js              # Initializing Express
│   └── server.js           # Starting the server
├── uploads/                # TXT files to be imported
├── .env                    # Environment file
├── .env.example            # Sample .env file
├── Dockerfile              # Docker configuration
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
