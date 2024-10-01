import { Player } from "../models/player";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as playerService from "../services/playerService";

dotenv.config();

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(400);
            throw new Error("Username and password are required");
        }
        const newPlayer: Player = await playerService.createPlayer(userName, password);
        res.status(201).json(newPlayer);
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(400);
            throw new Error("Username and password are required");
        }
        const player: Player | null = await playerService.authenticatePlayer(userName, password);
        if (!player) {
            res.status(401);
            throw new Error("Invalid username or password");
        }
        if (!process.env.JWT_SECRET) {
            res.status(401);
            throw new Error("Bad request")
        }
        const token = jwt.sign({ id: player.id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
}