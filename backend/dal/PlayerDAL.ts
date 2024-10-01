import { Player } from "../models/player";
import * as jsonFile from "jsonfile";

const FILE = "./players.json";

export const getPlayers = async (): Promise<Player[]> => 
    await jsonFile.readFile(FILE);
    
export const savePlayers = async (players: Player[]): Promise<void> => 
    await jsonFile.writeFile(FILE, players);