"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeUserEmailFromToken = exports.isTokenValid = exports.generateJWT = exports.createUserObject = exports.isPasswordValid = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = require("jsonwebtoken");
const UserModel_1 = require("../models/UserModel");
const isPasswordValid = (user, password) => {
    const hash = crypto_1.default
        .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
        .toString('hex');
    return hash === user.hash;
};
exports.isPasswordValid = isPasswordValid;
const createUserObject = (email, name, password) => {
    const salt = crypto_1.default.randomBytes(16).toString('hex');
    const hash = crypto_1.default
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');
    const user = new UserModel_1.UserModel({ login: email, name, salt, hash });
    return user;
};
exports.createUserObject = createUserObject;
const generateJWT = (user) => (0, jsonwebtoken_1.sign)({
    user: user.login,
    timestamp: new Date(),
}, process.env.SECRET, {
    expiresIn: '1h',
});
exports.generateJWT = generateJWT;
const isTokenValid = (token) => {
    if (token) {
        try {
            (0, jsonwebtoken_1.verify)(token, process.env.SECRET);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    return false;
};
exports.isTokenValid = isTokenValid;
const decodeUserEmailFromToken = (token) => {
    const tokenCode = token.substring(7, token.length);
    const tokenPayload = (0, jsonwebtoken_1.decode)(tokenCode, { complete: true });
    const payload = tokenPayload.payload;
    return payload['user'];
};
exports.decodeUserEmailFromToken = decodeUserEmailFromToken;
//# sourceMappingURL=security.js.map