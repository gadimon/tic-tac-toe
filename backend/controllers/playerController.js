var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as playerService from "../services/playerService";
dotenv.config();
export const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(400);
            throw new Error("Username and password are required");
        }
        const newPlayer = yield playerService.createPlayer(userName, password);
        res.status(201).json(newPlayer);
    }
    catch (error) {
        next(error);
    }
});
export const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(400);
            throw new Error("Username and password are required");
        }
        const player = yield playerService.authenticatePlayer(userName, password);
        if (!player) {
            res.status(401);
            throw new Error("Invalid username or password");
        }
        if (!process.env.JWT_SECRET) {
            res.status(401);
            throw new Error("Bad request");
        }
        const token = jwt.sign({ id: player.id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
});
