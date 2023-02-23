FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start:dev"]