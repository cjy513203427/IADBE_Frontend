FROM node:14

WORKDIR /app

COPY package.json .

RUN npm i node-sass --save-dev
RUN npm i -f @types/ws@8.5.4 --save-dev

RUN npm i

COPY . .

RUN npm run build --prod

EXPOSE 4200

# Start APP
CMD npm start
