import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { ContextAwareValidationArguments } from '../../utils/context-aware-validation-arguments.interface';
import { Not } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class UserEmailAlreadyExistsValidator
  implements ValidatorConstraintInterface
{
  constructor(readonly userService: UserService) {}

  async validate(
    value: string,
    args: ContextAwareValidationArguments,
  ): Promise<boolean> {
    const userId = args.object.context.params.id;

    const user = await this.userService.findOneByEmail(value, {
      id: userId ? Not(+userId) : undefined,
    });

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
