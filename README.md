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
    - REDIS_PASSWORD= `password`

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

- Create secure private key and public key using openssl algorithm (rsa, ecdsa, ed25519)
```sh
# private key
openssl genpkey -algorithm rsa -out rsa-private.pem
# public key
openssl pkey -in rsa-private.pem -pubout -out rsa-public.pem
```
```sh
# private key
openssl ecparam -genkey -name secp521r1 -noout -out es512-private.pem
# public key
openssl ec -in ecdsa-p521-private.pem -pubout -out es512-public.pem
```
```
# private key
openssl genpkey -algorithm ed25519 -out eddsa-private.pem
# public key
openssl pkey -in eddsa-private.pem -pubout -out eddsa-public.pem
```

- Create secure private key and public key using ssh-keygen algorithm (rsa, dsa, ecdsa, ed25519)
```sh
ssh-keygen -t rsa -b 4096
```
```sh
ssh-keygen -t dsa -b 2048
```
```sh
ssh-keygen -t ecdsa -b 521 
```
```sh
ssh-keygen -t ed25519
```

- Initialize Vercel legacy setup in `vercel.json`
```json
{
    "version": 2,
    "env": {
    },
    "builds": [
      {
        "src": "app/index.js",
        "use": "@vercel/node",
        "config": { "includeFiles": ["app/**"] }
      },
      {
        "src": "public/**",
        "use": "@vercel/static",
        "config": { "includeFiles": ["public/**"] }
      }
    ],
    "routes": [
      {
        "src": "/api/(.*)",
        "dest": "app/index.js"
      },
      {
        "src": "/",
        "dest": "public/index.html"
      },
      {
        "src": "/(.+)",
        "dest": "public/$1"
      }
    ]
  }
```
