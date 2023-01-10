import { Task } from "../entities/tasks";
import { AppDataSource } from "../initDs";

export const TaskRepository = AppDataSource.getRepository(Task);
