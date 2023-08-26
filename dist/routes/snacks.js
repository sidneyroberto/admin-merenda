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
exports.snacksRouter = void 0;
const express_1 = require("express");
const moment_1 = __importDefault(require("moment"));
const SnackController_1 = require("../controllers/SnackController");
const SnackModel_1 = require("../models/SnackModel");
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const storage_1 = require("firebase/storage");
const firebase_1 = require("../config/firebase");
const PushNotificationMessages_1 = require("../messages/PushNotificationMessages");
exports.snacksRouter = (0, express_1.Router)();
const snackCtrl = new SnackController_1.SnackController();
const loginCtrl = new LoginController_1.default();
const PER_PAGE = 9;
exports.snacksRouter.post('/thumb/upload', loginCtrl.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const thumb = req.files['thumb'];
    const refName = (0, moment_1.default)().format('YYYY_MM_DD');
    const storageRef = (0, storage_1.ref)(firebase_1.storage, refName);
    const fileContent = thumb.data;
    const metadata = {
        contentType: thumb.mimetype,
    };
    const result = yield (0, storage_1.uploadBytes)(storageRef, fileContent, metadata);
    console.log(`File upload result: ${result}`);
}));
exports.snacksRouter.post('/new_snack', loginCtrl.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errorMessages = (0, SnackModel_1.validateSnackInputs)(req.body);
    if (errorMessages.length === 0) {
        const { title, description } = req.body;
        const snack = new SnackModel_1.SnackModel({ title, description });
        try {
            const refName = (0, moment_1.default)(snack.offerDate).format('YYYY_MM_DD');
            console.log(`Trying to retrieve thumb from ${refName}`);
            const snackURL = yield (0, storage_1.getDownloadURL)((0, storage_1.ref)(firebase_1.storage, refName));
            snack.thumbURL = snackURL;
        }
        catch (err) { }
        yield snackCtrl.save(snack);
        (0, PushNotificationMessages_1.sendPushNotificationToAll)('Eba! Saiu o cardápio de hoje!', description);
        return res.render('new_snack', {
            successMessage: 'Merenda do dia salva!',
        });
    }
    return res.render('new_snack', { errorMessages, token: req.session.token });
}));
exports.snacksRouter.get('/new_snack', loginCtrl.verifyToken, (req, res) => res.render('new_snack'));
exports.snacksRouter.get('/details/:id', loginCtrl.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const snack = yield snackCtrl.findById(req.params.id);
    const page = Number(req.query.page);
    res.render('snack_details', { snack, page: !isNaN(page) ? page : 1 });
}));
exports.snacksRouter.get('/:page', loginCtrl.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.params.page);
    const amount = yield snackCtrl.findSnacksAmount();
    const snacks = yield snackCtrl.findLastSnacks(page, PER_PAGE);
    res.render('snacks', {
        snacks,
        totalPages: Math.ceil(amount / PER_PAGE),
        page,
        perPage: PER_PAGE,
    });
}));
//# sourceMappingURL=snacks.js.map