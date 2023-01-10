import express, { Router } from "express";
import { createTask, getAllTasks, updateTask } from "../controllers/tasks";

const router: Router = express.Router();

router.route("/update-task").put(updateTask);
router.route("/").get(getAllTasks).post(createTask);

export default router;
