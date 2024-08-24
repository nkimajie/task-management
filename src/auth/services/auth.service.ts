import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Encode } from 'src/globals/providers/encode';
import { CryptoEncrypt } from 'src/globals/providers/encrypt';
import { AuthRequestDto } from '../dtos/request/auth.data.request.dto';
import _ from 'lodash';
import { UserService } from 'src/user/services/user.service';
import UserRepository from 'src/user/repositories/user.repository';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { orderStatus } from 'src/utils/enums/order.enum';
import { emailTemplete, userTypeEnum } from 'src/utils/enums/enum';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private cryptoEncrypt: CryptoEncrypt,
    private encode: Encode,
    private userService: UserService,
  ) {}

  async find(payload: AuthRequestDto) {
    const user = await this.userRepo.find(payload);
    return user;
  }

  async signIn(payload: AuthRequestDto) {
    const user = await this.userRepo.find({
      email: payload.email,
      deleted: false,
    });
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          name: 'UNAUTHORIZED',
          error: 'Invalid User or Password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (user?.deleted) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          name: 'UNAUTHORIZED',
          error: 'Invalid User or Password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const hash = this.cryptoEncrypt.hash_password(payload.password);
    const match = this.cryptoEncrypt.compare_password(hash, user.password);

    if (!match) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          name: 'UNAUTHORIZED',
          error: 'Invalid User or Password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.encode.sign({
      id: user.id,
      role: user.role,
    });

    // return user;

    return _.omit({ ...user, token }, ['password']);
  }

  async signUp(payload: AuthRequestDto) {
    const user = await this.userService.findRecord({
      email: payload.email,
      deleted: false,
    });
    // console.log({ user });
    if (user) {
      const { status, userType } = user;
      if (status == 'PENDING' && userType != 'ADMIN') {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            name: 'UserExist',
            error: 'User already registered, please login.',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.FOUND,
          name: 'UserExists',
          error: 'User already exist',
        },
        HttpStatus.FOUND,
      );
    }

    const userData = await this.userService.create({
      ...payload,
      password: this.cryptoEncrypt.hash_password(payload.password),
    });

    return userData;
  }

  async getUser(id) {
    return await this.userRepo.findOne({ id });
  }
}
