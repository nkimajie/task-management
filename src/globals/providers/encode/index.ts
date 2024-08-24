/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class Encode {
  constructor(private jwtService: JwtService) {}

  sign(payload) {
    try {
      return this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: 'config.auth.secret',
      });
    } catch (e) {
      return false;
    }
  }
}
