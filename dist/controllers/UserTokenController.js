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
exports.UserTokenController = void 0;
const UserToken_1 = require("../models/UserToken");
class UserTokenController {
    save(userToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield this.findByDeviceToken(userToken.deviceToken);
            if (!token) {
                token = yield UserToken_1.UserTokenModel.create(userToken);
            }
            console.log('Already exists');
            return token;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield UserToken_1.UserTokenModel.find();
            return tokens;
        });
    }
    findByDeviceToken(deviceToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield UserToken_1.UserTokenModel.findOne({ deviceToken });
            return token;
        });
    }
}
exports.UserTokenController = UserTokenController;
//# sourceMappingURL=UserTokenController.js.map