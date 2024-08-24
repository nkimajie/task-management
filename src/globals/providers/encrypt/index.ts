/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
const crypto = require('crypto');
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoEncrypt {
  constructor(private configService: ConfigService) {}

  hash_password(password) {
    const sha_hash = this.configService.get<string>('App.sha_hash');
    const hash = crypto.createHash('sha512');
    return hash.update(`${password}${sha_hash}`).digest('hex');
  }

  compare_password(password, hash) {
    // 8ef6524e50cef34692afe3d57c33b4df4c037db5f602e874c7d6c07599748cbda140ae3e7c0b834df5000a0beb90fa25784152811dbeac2934f9a68da19fadc6
    return password === hash;
  }
}
