import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import _ from 'lodash';
import UserRepository from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async create(payload) {
    const user = await this.userRepo.create(payload);
    return user;
  }

  async find(payload) {
    const user = await this.userRepo.find(payload);
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          name: 'NotFound',
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findRecord(payload) {
    const user = await this.userRepo.find(payload);
    return user;
  }

  async modify(where, updates) {
    const user = await this.userRepo.modify(where, updates);
    return user;
  }
}
