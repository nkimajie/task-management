import { SequelizeModule } from '@nestjs/sequelize';
import User from './entities/user.entity';
import { UserService } from './services/user.service';
import { Module } from '@nestjs/common';
import UserRepository from './repositories/user.repository';

@Module({
  controllers: [],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
  imports: [SequelizeModule.forFeature([User])],
})
export class UserModule {}
