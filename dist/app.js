"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const path_1 = require("path");
const views_1 = require("./routes/views");
const snacks_1 = require("./routes/snacks");
const api_1 = require("./routes/api");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
(0, db_1.connectToMongoDB)();
exports.app = (0, express_1.default)();
exports.app.use((0, express_session_1.default)({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
    store: connect_mongo_1.default.create({ mongoUrl: process.env.DB_URL }),
}));
exports.app.use((0, cors_1.default)());
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use((0, express_fileupload_1.default)());
exports.app.engine('pug', require('pug').__express);
exports.app.set('views', (0, path_1.join)(__dirname, 'views'));
exports.app.set('view engine', 'pug');
exports.app.use(express_1.default.static((0, path_1.join)(__dirname, 'public')));
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use(express_1.default.json());
exports.app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
exports.app.use('/snacks', snacks_1.snacksRouter);
exports.app.use('/api', api_1.apiRouter);
exports.app.use('/', views_1.viewsRouter);
//# sourceMappingURL=app.js.map