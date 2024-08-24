import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  HttpStatus,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import {
  assignTaskSchema,
  CreateTaskCommentDto,
  createTaskCommentSchema,
  CreateTaskDto,
  createTaskSchema,
  statusSchema,
  tagSchema,
} from '../dto/create-task.dto';
import { TasksService } from '../services/tasks.service';
import { JoiValidationPipe } from 'src/globals/providers/validate/validate.pipe';
import { ResponseData } from 'src/auth/dtos/response/data.response.dto';
import RoleGuard from 'src/globals/guards/role.guard';
import Role from 'src/types/role.types';
import { calculate_query_params } from 'src/utils/helpers';
import { AuthRequestDto } from 'src/auth/dtos/request/auth.data.request.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(RoleGuard([Role.User, Role.Admin]))
  @UsePipes(new JoiValidationPipe(createTaskSchema))
  @Post()
  async create(
    @Body() body: CreateTaskDto,
    @Req() req,
  ): Promise<ResponseData<CreateTaskDto>> {
    const data = await this.tasksService.create({
      ...body,
      userId: req?.user?.id,
    });
    return {
      status: HttpStatus.CREATED,
      message: 'Task created successfully',
      data,
    };
  }

  @Get('')
  @UseGuards(RoleGuard([Role.User]))
  async getAllTasks(@Query() query, @Req() req) {
    const enhancedQuery = calculate_query_params(query);

    const {
      current_page,
      total_items,
      total_pages,
      data_response: data,
    } = await this.tasksService.findAll(enhancedQuery, req?.user?.id, query);

    return {
      status: HttpStatus.OK,
      message: 'Tasks retrieved successfully',
      data,
      meta: {
        total_items: total_items,
        total_pages,
        current_page,
      },
    };
  }

  @Get('get-comment/:taskId')
  @UseGuards(RoleGuard([Role.User]))
  async getAllTasksComment(
    @Param('taskId') taskId: string,
    @Query() query,
    @Req() req,
  ) {
    const enhancedQuery = calculate_query_params(query);

    const {
      current_page,
      total_items,
      total_pages,
      data_response: data,
    } = await this.tasksService.getAllTasksComment(enhancedQuery, +taskId);

    return {
      status: HttpStatus.OK,
      message: 'Tasks comments retrieved successfully',
      data,
      meta: {
        total_items: total_items,
        total_pages,
        current_page,
      },
    };
  }

  @UseGuards(RoleGuard([Role.User, Role.Admin]))
  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @UseGuards(RoleGuard([Role.User, Role.Admin]))
  @Patch('assign-task/:taskId')
  async assignTask(
    @Param('taskId') taskId: string,
    @Body(new JoiValidationPipe(assignTaskSchema)) updateTaskDto,
    @Req() req,
  ): Promise<ResponseData<any>> {
    const data = await this.tasksService.assignTask(
      req?.user as AuthRequestDto,
      +taskId,
      updateTaskDto,
    );

    return {
      status: HttpStatus.OK,
      message: 'Tasks assigned successfully',
      data,
    };
  }

  @UseGuards(RoleGuard([Role.User, Role.Admin]))
  @Patch('update-status/:taskId')
  async updateStatus(
    @Param('taskId') taskId: string,
    @Body(new JoiValidationPipe(statusSchema)) updateTaskDto,
    @Req() req,
  ): Promise<ResponseData<any>> {
    const data = await this.tasksService.updateTaskStatus(
      req?.user as AuthRequestDto,
      updateTaskDto?.status,
      +taskId,
    );

    return {
      status: HttpStatus.OK,
      message: 'Tasks assigned successfully',
      data,
    };
  }

  @UseGuards(RoleGuard([Role.User, Role.Admin]))
  @Patch('update-comment/:taskId')
  async updateTag(
    @Param('taskId') taskId: string,
    @Body(new JoiValidationPipe(createTaskCommentSchema)) updateTaskDto,
    @Req() req,
  ): Promise<ResponseData<any>> {
    const data = await this.tasksService.updateComment(
      req?.user as AuthRequestDto,
      updateTaskDto?.comment,
      +taskId,
    );

    return {
      status: HttpStatus.OK,
      message: 'Tasks updated successfully',
      data,
    };
  }

  @UseGuards(RoleGuard([Role.User, Role.Admin]))
  @Post('create-comment/:taskId')
  async createComment(
    @Param('taskId') taskId: string,
    @Body(new JoiValidationPipe(createTaskCommentSchema))
    body: CreateTaskCommentDto,
    @Req() req,
  ): Promise<ResponseData<CreateTaskDto>> {
    const data = await this.tasksService.createComment(
      body,
      +taskId,
      req?.user as AuthRequestDto,
    );
    return {
      status: HttpStatus.CREATED,
      message: 'Comment created successfully',
      data,
    };
  }

  @UseGuards(RoleGuard([Role.User, Role.Admin]))
  @Delete('delete-comment/:commentId')
  async removeComment(@Param('commentId') commentId: string, @Req() req) {
    await this.tasksService.deleteComment(+commentId, req.user);
    return {
      status: HttpStatus.CREATED,
      message: 'Comment deleted successfully',
    };
  }

  @UseGuards(RoleGuard([Role.User, Role.Admin]))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.tasksService.delete(+id, req.user);
  }
}
