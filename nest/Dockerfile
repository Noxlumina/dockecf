FROM node:16.20.2
WORKDIR /usr/src/app
RUN npm i -g @nestjs/cli
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 5000
CMD ["nest", "start"]


