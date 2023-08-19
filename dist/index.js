"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const mongoose_1 = require("mongoose");
const PORT = process.env.PORT || 8080;
const server = app_1.app.listen(PORT, () => console.log(`App running on port ${PORT}`));
const events = ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'];
events.forEach((e) => {
    process.on(e, () => {
        server.close();
        mongoose_1.connection.close();
    });
});
//# sourceMappingURL=index.js.map