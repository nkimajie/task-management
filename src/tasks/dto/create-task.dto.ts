import * as Joi from 'joi';
import { TaskStatus, TaskTag } from '../enum/tasks.enum';

export class CreateTaskDto {
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  TaskTag: TaskTag;
  assignorId: number;
  assigneeId: number;
  userId: number;
}

export class CreateTaskCommentDto {
  comment: string;
  userId: number;
  taskId: number;
}

export const createTaskCommentSchema = Joi.object({
  comment: Joi.string().required(),
});

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  status: Joi.string()
    .default(TaskStatus.TODO)
    .valid(...Object.values(TaskStatus))
    .required(),
  tag: Joi.string()
    .default(TaskTag.FEATURE)
    .valid(...Object.values(TaskTag)),
});

export const assignTaskSchema = Joi.object({
  assigneeId: Joi.number().required(),
});

export const statusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .required(),
});

export const tagSchema = Joi.object({
  tag: Joi.string()
    .valid(...Object.values(TaskTag))
    .required(),
});
