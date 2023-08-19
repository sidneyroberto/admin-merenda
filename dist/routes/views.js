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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRouter = void 0;
const express_1 = require("express");
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
exports.viewsRouter = (0, express_1.Router)();
const loginCtrl = new LoginController_1.default();
exports.viewsRouter.get('/', (req, res) => res.redirect('/snacks/1'));
exports.viewsRouter.get('/login', loginCtrl.verifyUserLoggedIn, (req, res) => res.render('login'));
exports.viewsRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const response = yield loginCtrl.doLogin(email, password);
    if (response.loggedIn) {
        req.session.token = response.token;
        req.session.user = response.user;
        return res.redirect('/snacks/1');
    }
    res.render('login', { message: response.message });
}));
exports.viewsRouter.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
});
//# sourceMappingURL=views.js.map