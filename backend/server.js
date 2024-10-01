import express from "express";
import * as dotenv from "dotenv";
import playerRouter from "./routes/playerRouter";
import { errorHandler } from "./middlewares/errorHandler";
dotenv.config();
const app = express();
// const server = http.createServer(app);
// const io = new  Server(server, {
//     cors:{
//         origin: "*",
//     }
// })
app.use(express.json());
app.use("/players", playerRouter);
app.use(errorHandler);
const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
