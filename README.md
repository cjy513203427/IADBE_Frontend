## Install
We assume you installed [nvm](https://github.com/nvm-sh/nvm), which helps us manage multiple versions.
### Development

```bash
nvm use 14.15.0
npm i node-sass --save-dev
npm i -f @types/ws@8.5.4 --save-dev
npm i
nvm use 20
ng serve
```

Once that's done, we can access the IADBE Frontend with http://localhost:4200.


### Production (Docker)

```bash
docker build -t iadbe_frontend .

docker run -dt -v /home/jinyao/projects/IADBE_Frontend/src:/app/src --name iadbe_frontend -p 4200:4200 iadbe_frontend

```

Access the IADBE Frontend with http://localhost:4200.
