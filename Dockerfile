FROM node:18-alpine3.16
WORKDIR /app
COPY . .
RUN npm install
CMD [ "npm", "run", "serve" ]