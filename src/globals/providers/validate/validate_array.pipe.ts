/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ArraySchema } from 'joi';
import { AuthRequestDto } from 'src/auth/dtos/request/auth.data.request.dto';

@Injectable()
export class JoiArrayValidationPipe implements PipeTransform<AuthRequestDto> {
  constructor(private schema: ArraySchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(this.modifyErrors(error));
    }

    return value;
  }

  errorReducer(accumulatedErrorObject, currentError) {
    return Object.assign(accumulatedErrorObject, {
      [currentError.context.label || currentError.context.key]:
        currentError.message.replace(new RegExp('"', 'ig'), ''),
    });
  }

  modifyErrors(errors) {
    return !errors?.details
      ? errors?.message ?? 'An error occured in body validation.'
      : errors?.details[0]?.message;
  }
}
