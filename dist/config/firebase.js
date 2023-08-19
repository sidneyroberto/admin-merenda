"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const firebaseConfig = {
    apiKey: 'AIzaSyAg2n8QFKttyo8esYje_oSGyUSrQa3nt4I',
    authDomain: 'imagens-merenda-ifms.firebaseapp.com',
    projectId: 'imagens-merenda-ifms',
    storageBucket: 'imagens-merenda-ifms.appspot.com',
    messagingSenderId: '600466379702',
    appId: '1:600466379702:web:77660f25c45cdf8e746717',
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.storage = (0, storage_1.getStorage)(app);
//# sourceMappingURL=firebase.js.map