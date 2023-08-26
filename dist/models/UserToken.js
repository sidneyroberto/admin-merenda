"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTokenModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    deviceToken: { type: String, required: true, unique: true },
});
exports.UserTokenModel = (0, mongoose_1.model)('UserToken', schema);
//# sourceMappingURL=UserToken.js.map