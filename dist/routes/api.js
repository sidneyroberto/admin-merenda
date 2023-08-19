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
exports.apiRouter = void 0;
const express_1 = require("express");
const SnackController_1 = require("../controllers/SnackController");
exports.apiRouter = (0, express_1.Router)();
const snackCtrl = new SnackController_1.SnackController();
exports.apiRouter.post('/evaluate/:id/:score', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const score = Number(req.params.score);
    if (!isNaN(score) && score >= 1 && score <= 5) {
        const id = req.params.id;
        yield snackCtrl.updateScore(id, score);
        return res.status(200).json({ message: 'Avaliação salva' });
    }
    return res.status(400).json({ message: 'Nota inválida' });
}));
exports.apiRouter.get('/today', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const snack = yield snackCtrl.findSnackOfTheDay();
    if (snack) {
        return res.status(200).json({ snack });
    }
    return res
        .status(404)
        .json({ message: 'Merenda do dia ainda não disponível' });
}));
//# sourceMappingURL=api.js.map