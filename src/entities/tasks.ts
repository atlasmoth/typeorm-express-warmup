import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
enum Priority {
  high = "high",
  medium = "medium",
  low = "low",
}
enum Status {
  to_do = "to_do",
  in_progress = "in_progress",
  done = "done",
}
@Entity()
export class Task {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text" })
  title: string;
  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date
  @Column({ type: "text" })
  description: string;
  @Column({ type: "enum", enum: Priority })
  priority: Priority;
  @Column({ type: "enum", enum: Status })
  status: Status;
}
