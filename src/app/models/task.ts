import { MasterTaskStatus } from "./master-task-status";
import { MasterTaskType } from "./master-task-type";

export type Task = {
  taskId: number;
  name: string;
  targetDate: Date;
  updateDate: Date;
  userByUpdateBy: string;
  status: MasterTaskStatus;
  type?: MasterTaskType;
};
