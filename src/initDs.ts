import { DataSource } from "typeorm";
import { Task } from "./entities/tasks";

const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_NAME = process.env.DB_NAME as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_PORT = process.env.DB_PORT as string;
const DB_USERNAME = process.env.DB_USERNAME as string;

export const AppDataSource = new DataSource({
  password: DB_PASSWORD,
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  database: DB_NAME,
  synchronize: process.env.NODE_ENV === "development",
  logging: true,
  entities: [Task],
  subscribers: [],
  migrations: [],
});
