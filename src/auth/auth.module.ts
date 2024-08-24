import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { GlobalModule } from 'src/globals/global.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    SequelizeModule.forFeature([]),
    forwardRef(() => GlobalModule),
    UserModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
