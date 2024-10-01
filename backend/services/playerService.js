var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import * as playerDAL from "../dal/PlayerDAL";
export const createPlayer = (userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield playerDAL.getPlayers();
    const passwordHash = yield bcrypt.hash(password, 10);
    const newPlayer = {
        id: uuid(),
        userName,
        passwordHash
    };
    players.push(newPlayer);
    yield playerDAL.savePlayers(players);
    return newPlayer;
});
export const authenticatePlayer = (userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield playerDAL.getPlayers();
    const player = players.find(currentPlayer => currentPlayer.userName === userName);
    if (player && (yield bcrypt.compare(password, player.passwordHash))) {
        return player;
    }
    return null;
});
