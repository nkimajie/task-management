import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  Get,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JoiValidationPipe } from '../../globals/providers/validate/validate.pipe';
import {
  loginSchema,
  registerSchema,
  AuthRequestDto,
} from '../dtos/request/auth.data.request.dto';
import { ResponseData } from '../dtos/response/data.response.dto';
import { IAuthUser } from '../../types/types';
import RoleGuard from 'src/globals/guards/role.guard';
import Role from 'src/types/role.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new JoiValidationPipe(loginSchema))
  @Post('login')
  async signIn(@Body() auth: AuthRequestDto): Promise<ResponseData<IAuthUser>> {
    const data = await this.authService.signIn(auth);
    return {
      status: HttpStatus.OK,
      message: 'User successfully login',
      data,
    };
  }

  @UsePipes(new JoiValidationPipe(registerSchema))
  @Post('register')
  async register(
    @Body() auth: AuthRequestDto,
  ): Promise<ResponseData<IAuthUser>> {
    const data = await this.authService.signUp(auth);
    return {
      status: HttpStatus.CREATED,
      message: 'User registered, otp successfully sent',
      data,
    };
  }

  @UseGuards(RoleGuard([Role.Admin, Role.User]))
  @Get('user')
  async getUser(@Req() req) {
    const data = await this.authService.getUser(req?.user?.id);
    return {
      status: HttpStatus.OK,
      message: 'User successfully retrived',
      data,
    };
  }
}
