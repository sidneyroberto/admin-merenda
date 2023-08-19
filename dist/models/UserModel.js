"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserInputs = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const email_validator_1 = __importDefault(require("email-validator"));
const schema = new mongoose_1.Schema({
    login: { type: String, required: true },
    name: { type: String, required: true },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
});
exports.UserModel = (0, mongoose_1.model)('User', schema);
var UserMessages;
(function (UserMessages) {
    UserMessages["INVALID_EMAIL"] = "E-mail inv\u00E1lido";
    UserMessages["INVALID_NAME"] = "O nome precisa conter ao menos 3 caracteres";
    UserMessages["INVALID_PASSWORD"] = "A senha precisa conter ao menos 8 caracteres, 1 caractere mai\u00FAsculo e 1 d\u00EDgito";
})(UserMessages || (UserMessages = {}));
const validateUserInputs = (userObj) => {
    const errorMessages = [];
    const { login, name, password } = userObj;
    if (!email_validator_1.default.validate(login)) {
        errorMessages.push(UserMessages.INVALID_EMAIL);
    }
    if (name.length < 3) {
        errorMessages.push(UserMessages.INVALID_NAME);
    }
    if (password &&
        password.length >= 8 &&
        /[A-Z]/g.test(password) &&
        /[0-9]/g.test(password)) {
        errorMessages.push(UserMessages.INVALID_PASSWORD);
    }
    return errorMessages;
};
exports.validateUserInputs = validateUserInputs;
//# sourceMappingURL=UserModel.js.map