FROM node:20-alpine3.19 //base image must use that

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm","run","dev"]
