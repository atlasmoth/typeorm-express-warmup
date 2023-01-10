import "reflect-metadata";
import dotenv from "dotenv";

import path from "path";
dotenv.config({ path: path.join(__dirname, "../.env") });
import express, { Express, Request, Response } from "express";
import { AppDataSource } from "./initDs";
import cors from "cors";
import helmet from "helmet";
import tasksRouter from "./routers/tasks";
import expressPino from "express-pino-logger";

const app: Express = express();
const PORT = process.env.PORT as string;
const logRequest = expressPino({
  level: "info",
  enabled: true,
});

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logRequest);

app.use("/tasks", tasksRouter);
app.all("/*", (req: Request, res: Response) => {
  res.send({ success: false, message: "Invalid route" });
});

AppDataSource.initialize()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Listening to ${PORT}`);
    })
  )
  .catch(console.error);
