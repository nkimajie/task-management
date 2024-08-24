import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Tasks from '../entities/tasks.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import User from 'src/user/entities/user.entity';

@Injectable()
export default class TasksRepository {
  constructor(
    @InjectModel(Tasks)
    private readonly task: typeof Tasks,
  ) {}

  create(data: CreateTaskDto): Promise<Tasks> {
    return this.task.create<Tasks>({
      ...data,
    });
  }

  async find(data) {
    const dataA = await this.task.findOne<Tasks>({
      where: data,
      include: [
        {
          model: User,
          as: 'createdBy',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: User,
          as: 'assignBy',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: User,
          as: 'assignTo',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });
    return dataA;
  }

  findAll(where, meta?): Promise<{ rows: Tasks[]; count: number }> {
    return this.task.findAndCountAll<Tasks>({
      where,
      ...meta,
      include: [
        {
          model: User,
          as: 'createdBy',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: User,
          as: 'assignBy',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: User,
          as: 'assignTo',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });
  }

  modify(where: any, updates: object) {
    return this.task.update<Tasks>(updates, {
      where: where,
    });
  }

  delete(data) {
    return this.task.destroy<Tasks>({
      where: data,
    });
  }
}
