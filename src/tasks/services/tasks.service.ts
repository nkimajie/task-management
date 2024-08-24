import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskCommentDto, CreateTaskDto } from '../dto/create-task.dto';
import { calculate_pagination_data } from 'src/utils/helpers';
import TasksRepository from '../repositories/tasks.repository';
import UserRepository from 'src/user/repositories/user.repository';
import { AuthRequestDto } from 'src/auth/dtos/request/auth.data.request.dto';
import { UserTypes } from 'src/user/enum/user.enum';
import TasksCommentRepository from '../repositories/tasks_comment.repository';
import { EmailJs } from './email.service';

@Injectable()
export class TasksService {
  constructor(
    private tasksRepo: TasksRepository,
    private userRepo: UserRepository,
    private tasksCommentRepo: TasksCommentRepository,
    private emailJs: EmailJs,
  ) {}
  create(createTaskDto: CreateTaskDto) {
    return this.tasksRepo.create(createTaskDto);
  }

  async createComment(
    createTaskDto: CreateTaskCommentDto,
    taskId,
    user: AuthRequestDto,
  ) {
    const task = await this.tasksRepo.find({
      id: taskId,
    });
    if (!task) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          name: 'BadRequest',
          error: 'Task with taskId does not exist.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.tasksCommentRepo.create({
      ...createTaskDto,
      userId: user?.id,
      taskId,
    });
  }

  async getAllTasksComment(enhancedQuery: any, taskId?: number, query?) {
    const { limit_query, offset_query, query_page } = enhancedQuery;

    const meta = {
      limit: limit_query,
      offset: offset_query,
    };

    const where = {
      // ...(query?.tag && {
      //   tag: query.tag,
      // }),
      ...(taskId && {
        taskId,
      }),
    };
    const data = await this.tasksCommentRepo.findAll(where, meta);

    return calculate_pagination_data(data, query_page, meta.limit);
  }

  async findAll(enhancedQuery: any, userId?: number, query?) {
    const { limit_query, offset_query, query_page } = enhancedQuery;

    const meta = {
      limit: limit_query,
      offset: offset_query,
    };

    const where = {
      ...(query?.tag && {
        tag: query.tag,
      }),
      ...(userId && {
        userId,
      }),
    };
    const data = await this.tasksRepo.findAll(where, meta);

    return calculate_pagination_data(data, query_page, meta.limit);
  }

  async assignTask(user: AuthRequestDto, taskId: number, body: any) {
    const task = await this.tasksRepo.find({
      id: taskId,
    });
    if (!task) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          name: 'BadRequest',
          error: 'Task with taskId does not exist.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const assignee = await this.userRepo.find({
      id: body?.assigneeId,
    });
    if (!assignee) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          name: 'BadRequest',
          error: 'Assignee with assigneeId does not exist.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.tasksRepo.modify(
      { id: taskId },
      {
        assigneeId: body?.assigneeId,
        assignorId: user?.id,
      },
    );

    this.emailJs.send(
      `Hello ${assignee?.firstName} \nA task "${task?.title}" has been assigned to you.\nregards.`,
      assignee?.email,
      'Task Assignment',
    );

    return await this.tasksRepo.find({
      id: taskId,
    });
  }

  findOne(id: number) {
    return this.tasksRepo.find({ id });
  }

  update(id: number, updateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async updateTaskStatus(user: AuthRequestDto, status: string, id?: number) {
    const exist = await this.tasksRepo.find({ id });
    if (!exist) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          name: 'BadRequest',
          error: 'Task does not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user?.userType != UserTypes.ADMIN) {
      if (exist.userId != user?.id) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            name: 'BadRequest',
            error: 'Task does not belong to user and cannot be updated.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    await this.tasksRepo.modify({ id }, { status });

    const assignee = await this.userRepo.find({
      id: exist?.assigneeId,
    });

    this.emailJs.send(
      `Hello ${assignee?.firstName} \nThe status of your task "${exist?.title}" has been updated to ${status}.\nregards.`,
      assignee?.email,
      'Task Assignment',
    );

    return await this.tasksRepo.find({
      id,
    });
  }

  async updateComment(user: AuthRequestDto, comment: string, id?: number) {
    const exist = await this.tasksCommentRepo.find({ id });
    if (!exist) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          name: 'BadRequest',
          error: 'Comment does not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user?.userType != UserTypes.ADMIN) {
      if (exist.userId != user?.id) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            name: 'BadRequest',
            error: 'Comment does not belong to user and cannot be updated.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    await this.tasksCommentRepo.modify({ id }, { comment });
    return await this.tasksCommentRepo.find({
      id,
    });
  }

  async deleteComment(id: number, user: AuthRequestDto) {
    const exist = await this.tasksCommentRepo.find({ id });
    if (!exist) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          name: 'BadRequest',
          error: 'Comment does not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user?.userType != UserTypes.ADMIN) {
      if (exist.userId != user?.id) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            name: 'BadRequest',
            error: 'Comment does not belong to user and cannot be deleted.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const data = await this.tasksCommentRepo.delete({ id });
    return data;
  }

  async updateTaskTag(user: AuthRequestDto, tag: string, id?: number) {
    const exist = await this.tasksRepo.find({ id });
    if (!exist) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          name: 'BadRequest',
          error: 'Task does not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user?.userType != UserTypes.ADMIN) {
      if (exist.userId != user?.id) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            name: 'BadRequest',
            error: 'Task does not belong to user and cannot be updated.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    await this.tasksRepo.modify({ id }, { tag });
    return await this.tasksRepo.find({
      id,
    });
  }

  async delete(id: number, user: AuthRequestDto) {
    const exist = await this.tasksRepo.find({ id });
    if (!exist) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          name: 'BadRequest',
          error: 'Task does not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user?.userType != UserTypes.ADMIN) {
      if (exist.userId != user?.id) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            name: 'BadRequest',
            error: 'Task does not belong to user and cannot be deleted.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const data = await this.tasksRepo.delete({ id });
    return data;
  }
}
