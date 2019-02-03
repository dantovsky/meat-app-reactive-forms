import * as  jsonServer from 'json-server'
import { Express } from 'express' // tipo que representa uma app em Express

// módulo para configurar o HTTPS, capaz de ler o certificado e a privatekey
import * as fs from 'fs' // file system
import * as https from 'https'

import { handleAuthentication } from './auth'
import { handleAuthorization } from './authz'

const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// middleware para login
server.post('/login', handleAuthentication)
// utilizaremos o método use() para que funcione com qualquer método HTTP(get, put, post, delete)
server.use('/orders', handleAuthorization)

// Use default router
server.use(router)

// antes de chamar o método listen(), vamos 1º obter uma ref ao cert e a key
const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem')
}

https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running on https://localhost:3001')
})
