import { Task } from "../entities/tasks";
import { TaskRepository } from "../repositories/tasks";
import HandleError from "./handleError";
import { z } from "zod";

export const getAllTasks = HandleError(async (req, res) => {
  const tasks: Task[] = await TaskRepository.find({
    order: { created_at: "ASC" },
  });
  res.send({ success: true, tasks });
});

export const createTask = HandleError(async (req, res) => {
  const bodySchema = z.object({
    title: z.string({
      required_error: "title is required",
    }),
    description: z.string({
      required_error: "description is required",
    }),
    priority: z.string({
      required_error: "priority is required",
    }),
    status: z.string({
      required_error: "status is required",
    }),
  });
  await bodySchema.parseAsync(req.body);
  const task: Task = TaskRepository.create({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
  });
  await TaskRepository.save(task);

  res.send({ success: true, task });
});

export const updateTask = HandleError(async (req, res) => {
  const task = await TaskRepository.findOneBy({ id: req.body.id });
  if (!task) {
    throw new Error("Invalid task id");
  }
  task.description = req.body.description || task.description;
  task.title = req.body.title || task.title;
  task.priority = req.body.priority || task.priority;
  task.status = req.body.status || task.status;

  await TaskRepository.save(task);

  res.status(201).send({ success: true, task });
});
