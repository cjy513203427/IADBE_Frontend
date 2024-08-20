FROM node:14

WORKDIR /app

COPY package.json .

# install node-sass and save to devDependencies
RUN npm i node-sass --save-dev
# force install @types/ws@8.5.4
RUN npm i -f @types/ws@8.5.4 --save-dev

RUN npm i

COPY . .

RUN npm run build --prod

EXPOSE 4200

# Start APP
CMD npm start
