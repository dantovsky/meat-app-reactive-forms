"use strict";
exports.__esModule = true;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
exports.handleAuthentication = function (req, resp) {
    //code que vai processar o POST que foi feito pro login
    var user = req.body;
    if (isValid(user)) {
        // const para representar o user
        var dbUser = users_1.users[user.email]; // isto seria o equivalente a uma query no BD
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, api_config_1.apiConfig.secret);
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
};
function isValid(user) {
    console.log(user);
    if (!user) {
        return false;
    }
    var dbUser = users_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
