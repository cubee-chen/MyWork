FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install -g nodemon
COPY . .
EXPOSE 5000

CMD ["nodemon", "app.js"]