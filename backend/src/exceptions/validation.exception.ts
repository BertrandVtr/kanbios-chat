import { BadRequestException, ValidationError } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(private readonly errors: ValidationError[]) {
    super();
  }

  initMessage() {
    super.initMessage();
  }
}
