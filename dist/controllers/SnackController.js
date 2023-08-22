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
exports.SnackController = void 0;
const moment_1 = __importDefault(require("moment"));
const SnackModel_1 = require("../models/SnackModel");
class SnackController {
    save(snack) {
        return __awaiter(this, void 0, void 0, function* () {
            const snackOfTheDay = yield this.findSnackOfTheDay();
            if (snackOfTheDay) {
                const updatedSnack = yield SnackModel_1.SnackModel.findOneAndReplace({
                    _id: snackOfTheDay._id,
                }, {
                    title: snack.title,
                    description: snack.description,
                    thumbURL: snack.thumbURL,
                });
                return updatedSnack;
            }
            const savedSnack = yield SnackModel_1.SnackModel.create(snack);
            return savedSnack;
        });
    }
    updateScore(id, score) {
        return __awaiter(this, void 0, void 0, function* () {
            const snack = yield this.findById(id);
            const divisor = snack.evaluationScore === 0 ? 1 : 2;
            snack.evaluationScore = (snack.evaluationScore + score) / divisor;
            const updatedSnack = yield SnackModel_1.SnackModel.updateOne({ _id: id }, snack);
            return updatedSnack;
        });
    }
    findSnackOfTheDay() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = `${(0, moment_1.default)().format('YYYY-MM-DD')}T00:00:00.000Z`;
            console.log(`currentDate: ${currentDate}`);
            const snackOfTheDay = yield SnackModel_1.SnackModel.findOne({
                offerDate: {
                    $gte: new Date(currentDate),
                },
            });
            return snackOfTheDay;
        });
    }
    findLastSnacks(page, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const snacks = yield SnackModel_1.SnackModel.find()
                .sort({ offerDate: -1 })
                .skip((page - 1) * amount)
                .limit(amount)
                .exec();
            return snacks;
        });
    }
    findSnacksAmount() {
        return __awaiter(this, void 0, void 0, function* () {
            const amount = yield SnackModel_1.SnackModel.count({});
            return amount;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const snack = yield SnackModel_1.SnackModel.findById(id);
            return snack;
        });
    }
}
exports.SnackController = SnackController;
//# sourceMappingURL=SnackController.js.map