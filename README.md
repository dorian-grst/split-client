<h1>
<img align="center" src="https://split.backtothe.cloud/assets/white_logo-65UcD7d6.svg" height="24px"/>
SPL!T
</h1>

**SPL!T** is a [tricount](https://www.tricount.com/) clone developed in [React](https://react.dev/) and [AdonisJS](https://adonisjs.com/). Simplify sharing expenses between friends with a user-friendly and secure interface with SPL!T.

## Access to the online project
&rarr; [SPL!T](https://split.backtothe.cloud) &larr;

## Launch the project locally

### 1. Front-end
```bash
$ git clone https://github.com/dorian-grst/split-client.git

$ cd split-client

$ npm install

$ npm run dev
```
### 2. Back-end
```bash
$ git clone https://github.com/dorian-grst/split-server.git

$ cd split-server
```
Afterward, generate a .env file and input the following values as your environment variables:
```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=<app-key>
DRIVE_DISK=local
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
PG_DB_NAME=woa
```
Subsequently, return to your terminal and execute the following commands:
```bash
$ docker compose up -d

$ node ace migration:run

$ npm run dev
```
Then, go on your browser at this URL :

```bash
http://127.0.0.1:<frontend-port>
```

> ⚠️ Don't try to launch with `localhost:<frontend-port>`, the connection to the application won't work (I don't know why 😓).

## Technical Document Architecture

You can find my TDA in this repository : `Architecture.md`

**Good job ! ✨**