import express, { Router } from "express";
import { createTask, getAllTasks } from "../controllers/tasks";

const router: Router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
export default router;
