import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import User from 'src/user/entities/user.entity';
import TasksComment from '../entities/tasks_comment.entity';
import { CreateTaskCommentDto } from '../dto/create-task.dto';

@Injectable()
export default class TasksCommentRepository {
  constructor(
    @InjectModel(TasksComment)
    private readonly comment: typeof TasksComment,
  ) {}

  create(data: CreateTaskCommentDto): Promise<TasksComment> {
    return this.comment.create<TasksComment>({
      ...data,
    });
  }

  async find(data) {
    const dataA = await this.comment.findOne<TasksComment>({
      where: data,
      include: [
        {
          model: User,
          as: 'commentedBy',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });
    return dataA;
  }

  findAll(where, meta?): Promise<{ rows: TasksComment[]; count: number }> {
    return this.comment.findAndCountAll<TasksComment>({
      where,
      ...meta,
      include: [
        {
          model: User,
          as: 'commentedBy',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });
  }

  modify(where: any, updates: object) {
    return this.comment.update<TasksComment>(updates, {
      where: where,
    });
  }

  delete(data) {
    return this.comment.destroy<TasksComment>({
      where: data,
    });
  }
}
