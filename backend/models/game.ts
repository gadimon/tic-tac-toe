
import { Player } from './player';

export interface Game {
    id: string;
    players: Player[];
    winner: string;
}
