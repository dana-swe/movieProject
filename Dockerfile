FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_PORT=8000


RUN mkdir -p /app/data

EXPOSE ${APP_PORT}


CMD ["npm", "run", "dev"]
