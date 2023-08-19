"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSnackInputs = exports.SnackModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    offerDate: { type: Date, default: new Date() },
    evaluationScore: { type: Number, default: 0 },
    description: { type: String, required: true },
    thumbURL: { type: String },
});
exports.SnackModel = (0, mongoose_1.model)('Snack', schema);
var SnackMessages;
(function (SnackMessages) {
    SnackMessages["INVALID_TITLE"] = "O t\u00EDtulo deve conter ao menos 5 caracteres";
    SnackMessages["INVALID_DESCRIPTION"] = "A descri\u00E7\u00E3o deve conter ao menos 5 caracteres";
})(SnackMessages || (SnackMessages = {}));
const validateSnackInputs = (snackObj) => {
    const { title, description } = snackObj;
    const errorMessages = [];
    if (title.length < 5) {
        errorMessages.push(SnackMessages.INVALID_TITLE);
    }
    if (description.length < 5) {
        errorMessages.push(SnackMessages.INVALID_DESCRIPTION);
    }
    return errorMessages;
};
exports.validateSnackInputs = validateSnackInputs;
//# sourceMappingURL=SnackModel.js.map