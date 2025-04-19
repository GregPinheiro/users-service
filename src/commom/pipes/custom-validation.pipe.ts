import { ValidationPipe, UnprocessableEntityException } from '@nestjs/common';

export const CustomValidationPipe = new ValidationPipe({
  transform: true,
  exceptionFactory: (errors) => {
    const messages = errors.map(
      (e) => `${e.property}: ${Object.values(e.constraints ?? {}).join(', ')}`,
    );
    return new UnprocessableEntityException(messages);
  },
});
