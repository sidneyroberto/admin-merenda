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
exports.sendPushNotificationToAll = void 0;
const app_1 = require("firebase-admin/app");
const messaging_1 = require("firebase-admin/messaging");
const serviceAccountKey_json_1 = __importDefault(require("../keys/serviceAccountKey.json"));
const UserTokenController_1 = require("../controllers/UserTokenController");
const app = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)(serviceAccountKey_json_1.default),
});
const sendPushNotificationToAll = (title, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCtrl = new UserTokenController_1.UserTokenController();
        const tokens = yield userCtrl.findAll();
        const messages = tokens.map((t) => ({
            token: t.deviceToken,
            notification: { title, body },
        }));
        const batchPromises = [];
        const messaging = (0, messaging_1.getMessaging)(app);
        for (let i = 0; i < messages.length; i++) {
            const batchPromise = messaging.send(messages[i]);
            batchPromises.push(batchPromise);
        }
        yield Promise.all(batchPromises);
        console.log('Push notifications sent to all users');
    }
    catch (err) {
        console.error('Error sending push notifications:', err);
    }
});
exports.sendPushNotificationToAll = sendPushNotificationToAll;
//# sourceMappingURL=PushNotificationMessages.js.map