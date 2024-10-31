import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UserEmailAlreadyExistsValidator
  implements ValidatorConstraintInterface
{
  constructor(readonly userService: UserService) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.userService.findOneByEmail(value);
    return !user;
  }

  defaultMessage(): string {
    return 'This email is already used';
  }
}

export function IsUniqueUserEmail(options?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsUserAlreadyExists',
      target: object.constructor,
      propertyName,
      options,
      validator: UserEmailAlreadyExistsValidator,
    });
  };
}
