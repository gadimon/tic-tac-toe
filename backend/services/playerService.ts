import { Player } from "../models/player";
import * as bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import * as playerDAL from "../dal/PlayerDAL";

export const createPlayer = async (userName: string, password: string): Promise<Player> => {
    const players: Player[] = await playerDAL.getPlayers();
    const passwordHash: string = await bcrypt.hash(password, 10);
    const newPlayer: Player = {
        id: uuid(),
        userName,
        passwordHash
    }
    players.push(newPlayer);
    await playerDAL.savePlayers(players);
    return newPlayer;
}

export const authenticatePlayer = async (userName: string, password: string): Promise<Player | null> => {
    const players: Player[] = await playerDAL.getPlayers();
    const player = players.find(currentPlayer => currentPlayer.userName === userName);

    if (player && await bcrypt.compare(password, player.passwordHash)) {
        return player;
    }
    return null;
}