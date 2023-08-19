"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../models/UserModel");
const security_1 = require("../utils/security");
var LoginMessages;
(function (LoginMessages) {
    LoginMessages["USER_REGISTERED"] = "Usu\u00E1rio registrado com sucesso";
    LoginMessages["USER_ALREADY_EXISTS"] = "Usu\u00E1rio j\u00E1 existente";
    LoginMessages["USER_NOT_AUTHORIZED"] = "Usu\u00E1rio n\u00E3o autorizado";
})(LoginMessages || (LoginMessages = {}));
class LoginController {
    registerUsuario(login, name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = this.findUser(login);
            if (!user) {
                const newUser = (0, security_1.createUserObject)(login, name, password);
                yield UserModel_1.UserModel.create(newUser);
                return { registered: true, message: LoginMessages.USER_REGISTERED };
            }
            else {
                return { registered: false, mensagem: LoginMessages.USER_ALREADY_EXISTS };
            }
        });
    }
    doLogin(login, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUser(login);
            if (user && (0, security_1.isPasswordValid)(user, senha)) {
                const token = (0, security_1.generateJWT)(user);
                return {
                    loggedIn: true,
                    user,
                    token,
                };
            }
            else {
                return {
                    loggedIn: false,
                    message: LoginMessages.USER_NOT_AUTHORIZED,
                };
            }
        });
    }
    findUser(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findOne({ login });
            return user;
        });
    }
    verifyToken(req, res, next) {
        const token = req.session.token;
        console.log(token);
        if ((0, security_1.isTokenValid)(token)) {
            console.log('Vai para a home');
            next();
        }
        else {
            console.log('Vai para o login');
            res.redirect('/login');
        }
    }
    verifyUserLoggedIn(req, res, next) {
        const token = req.session.token;
        console.log(token);
        if ((0, security_1.isTokenValid)(token)) {
            console.log('Vai para a home');
            res.redirect('/snacks');
        }
        else {
            console.log('Vai para o login');
            next();
        }
    }
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map