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
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const UserModel_1 = require("./models/UserModel");
const security_1 = require("./utils/security");
dotenv_1.default.config();
(0, db_1.connectToMongoDB)().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, security_1.createUserObject)('sidney.sousa@ifms.edu.br', 'Sidney Sousa', 'admin123aiquefome');
    const savedObj = yield UserModel_1.UserModel.create(user);
    console.log(savedObj);
}));
//# sourceMappingURL=createUser.js.map