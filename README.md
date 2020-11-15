# RennerFotos
See photos of real people using ors product.

## Requeriments
- [Node.JS](https://nodejs.org/en/) _tested v10.19.0_
- For MongoDB we use https://cloud.mongodb.com it's free.

## rennerfotos-common (Need for rennerfotos-robot and rennerfotos-backend)
### How install? 
- `cd rennerfotos-common`
- `npm install`

## rennerfotos-robot
### Environment vars
Use .env
- MONGODB_URI (Exemple mongodb+srv://<username>:<password>@cluster0.zbtgl.mongodb.net/<dbname>?retryWrites=true&w=majority)
- POS_VENDA_NUMERO (Exemple 000000000000@c.us)

### How run?
- `cd rennerfotos-robot`
- `npm install`
- `npm start`

### 3rd party
- [venom-bot](https://www.npmjs.com/package/venom-bot)

## rennerfotos-backend
### Environment vars
Use .env
- MONGODB_URI (Exemple mongodb+srv://<username>:<password>@cluster0.zbtgl.mongodb.net/<dbname>?retryWrites=true&w=majority)

### How run?
- `cd rennerfotos-backend`
- `npm install`
- `npm start`

### 3rd party
- [restify](https://www.npmjs.com/package/restify)

## rennerfotos-web (A.k.a Frontend)
### How run?
- `cd rennerfotos-web`
- `npx lite-server`

## Contrubuting
Everybody are wellcome.
We use https://www.conventionalcommits.org/en/v1.0.0/ and https://gitmoji.carloscuesta.me/.
