import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'src/types/types';

export class ValidationException extends BadRequestException {
  constructor(public error: ValidationError[]) {
    super();
  }
}
