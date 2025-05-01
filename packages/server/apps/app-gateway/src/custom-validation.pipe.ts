import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipeOptions,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  private baseOpts: ValidationPipeOptions = {
    validationError: { target: false },
  };

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || this.isPrimitive(metatype)) {
      return value;
    }

    // ensure we always get an object instance
    const plain = value && typeof value === 'object' ? value : {};
    const object = plainToInstance(metatype, plain);

    // Phase 1: required
    const reqErrs = await validate(object, {
      ...this.baseOpts,
      groups: ['required'],
    });
    if (reqErrs.length) {
      const msgs = reqErrs.flatMap((e) => Object.values(e.constraints!));
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: msgs,
      });
    }

    // Phase 2a: type
    const typeErrs = await validate(object, {
      ...this.baseOpts,
      groups: ['type'],
    });
    if (typeErrs.length) {
      const msgs = typeErrs.flatMap((e) => Object.values(e.constraints!));
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: msgs,
      });
    }

    // Phase 2b: range/other
    const otherErrs = await validate(object, {
      ...this.baseOpts,
      groups: ['range', 'other'],
    });
    if (otherErrs.length) {
      const msgs = otherErrs.flatMap((e) => Object.values(e.constraints!));
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: msgs,
      });
    }

    return object;
  }

  private isPrimitive(metatype: any): boolean {
    return [String, Boolean, Number, Array, Object].includes(metatype);
  }
}
