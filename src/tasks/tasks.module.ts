import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import TasksRepository from './repositories/tasks.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import Tasks from './entities/tasks.entity';
import { UserModule } from 'src/user/user.module';
import TasksComment from './entities/tasks_comment.entity';
import TasksCommentRepository from './repositories/tasks_comment.repository';
import { EmailJs } from './services/email.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, TasksCommentRepository, EmailJs],
  exports: [TasksService, TasksRepository],
  imports: [SequelizeModule.forFeature([Tasks, TasksComment]), UserModule],
})
export class TasksModule {}
