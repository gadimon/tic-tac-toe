import * as express from "express";
import * as playerController from "../controllers/playerController";
const router = express.Router();
router.post("/auth/register", playerController.register);
router.post("/auth/login", playerController.login);
export default router;
