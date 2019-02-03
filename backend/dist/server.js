"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
// módulo para configurar o HTTPS, capaz de ler o certificado e a privatekey
var fs = require("fs"); // file system
var https = require("https");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
// middleware para login
server.post('/login', auth_1.handleAuthentication);
// utilizaremos o método use() para que funcione com qualquer método HTTP(get, put, post, delete)
server.use('/orders', authz_1.handleAuthorization);
// Use default router
server.use(router);
// antes de chamar o método listen(), vamos 1º obter uma ref ao cert e a key
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running on https://localhost:3001');
});
