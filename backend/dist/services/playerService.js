"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.authenticatePlayer = exports.createPlayer = void 0;
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const playerDAL = __importStar(require("../dal/PlayerDAL"));
const createPlayer = (userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield playerDAL.getPlayers();
    const passwordHash = yield bcrypt.hash(password, 10);
    const newPlayer = {
        id: (0, uuid_1.v4)(),
        userName,
        passwordHash
    };
    players.push(newPlayer);
    yield playerDAL.savePlayers(players);
    return newPlayer;
});
exports.createPlayer = createPlayer;
const authenticatePlayer = (userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield playerDAL.getPlayers();
    const player = players.find(currentPlayer => currentPlayer.userName === userName);
    if (player && (yield bcrypt.compare(password, player.passwordHash))) {
        return player;
    }
    return null;
});
exports.authenticatePlayer = authenticatePlayer;
