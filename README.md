# CHAT APPLICATION USING REDIS AND SOCKET.IO

## Get Started

- Node Engine

```
node: v14.17.5
npm: 6.14.14
```

- Switch node engine

```sh
nvm use
```

## Install Dependencies

```sh
npm install
```

## Redis Server

- Before start the backend server, please make sure that your redis server is running or not. You can also run redis server using below command,

```sh
docker-compose up -d
```

## Important Environment Variables
- In Development,
    - None

- In Production,
    - REDIS_HOST= `0.0.0.0`
    - REDIS_PORT= `6379`
    - REDIS_PASSWORD= `test`

## Development

**Start a server in development** 

```sh
npm run dev
```

## Production

```sh
npm start
```

## Tips

- How to create a https credentials certificate (for production)
```sh
openssl genrsa -out ./keys/key.pem
openssl req -new -key ./keys/key.pem -out ./keys/csr.pem
openssl x509 -req -days 9999 -in ./keys/csr.pem -signkey ./keys/key.pem -out ./keys/cert.pem
rm ./keys/csr.pem
```