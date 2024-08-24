import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import User from '../entities/user.entity';
import { Op } from 'sequelize';

@Injectable()
export default class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userEntity: typeof User,
  ) {}

  create(data): Promise<User> {
    return this.userEntity.create<User>({
      ...data,
    });
  }

  find(data): Promise<User> {
    return this.userEntity.findOne<User>({
      where: data,
      raw: true,
    });
  }

  findOne(data): Promise<User> {
    return this.userEntity.findOne<User>({
      where: data,
      attributes: {
        exclude: ['password'],
      },
      raw: true,
    });
  }

  modify(where, updates) {
    return this.userEntity.update<User>(updates, {
      where: where,
    });
  }
}
