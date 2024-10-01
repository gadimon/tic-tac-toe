import express from "express";
import { Application } from "express";
import * as dotenv from "dotenv";
import playerRouter from "./routes/playerRouter";
import { errorHandler} from "./middlewares/errorHandler";
import http from "http";
import  { Server, Socket } from "socket.io";

dotenv.config();

const app: Application = express();
// const server = http.createServer(app);
// const io = new  Server(server, {
//     cors:{
//         origin: "*",
//     }
// })








app.use(express.json());

app.use("/players", playerRouter);

app.use(errorHandler);

const PORT: string = process.env.PORT || "3000";

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});