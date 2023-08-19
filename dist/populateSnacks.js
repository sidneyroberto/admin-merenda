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
const SnackModel_1 = require("./models/SnackModel");
dotenv_1.default.config();
const snacks = [
    {
        title: 'Pão com carne',
        description: 'Pão recheado com carne moída',
    },
    {
        title: 'Arroz carreteiro',
        description: 'Arroz com charque e um delicioso tempero pantaneiro',
    },
    {
        title: 'Frango com polenta',
        description: 'Frango ensopado acompanhado com uma deliciosa polenta cremosa',
    },
    {
        title: 'Macarrão com carne moída',
        description: 'Espaguete com um delicioso molho à bolonhesa',
    },
    {
        title: 'Canjica',
        description: 'Canjica com um caldo doce maravilhoso com aquele toque de canela',
    },
    {
        title: 'Galinhada',
        description: 'Arroz com frango, milho, ervilhas e um tempero fabuloso',
    },
    {
        title: 'Pão e iogurte',
        description: 'Pão com margarina e iogurte de morango',
    },
    {
        title: 'Nhoque',
        description: 'Nhoque de batatas ao molho bolonhesa',
    },
    {
        title: 'PF #1',
        description: 'Arroz, feijão, salada e bife',
    },
    {
        title: 'PF #2',
        description: 'Arroz, feijão, salada e frango grelhado',
    },
    {
        title: 'PF #3',
        description: 'Arroz, feijão, salada e linguiça',
    },
    {
        title: 'PF #4',
        description: 'Macarrão alho e óleo e frango grelhado',
    },
    {
        title: 'PF #5',
        description: 'Macarrão ao molho bolonhesa e almôndegas',
    },
];
(0, db_1.connectToMongoDB)().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield SnackModel_1.SnackModel.deleteMany({});
    for (let i = 0; i < snacks.length; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const snack = new SnackModel_1.SnackModel({
            title: snacks[i].title,
            description: snacks[i].description,
            offerDate: d,
        });
        yield SnackModel_1.SnackModel.create(snack);
    }
    console.log('Mal feito desfeito');
}));
//# sourceMappingURL=populateSnacks.js.map