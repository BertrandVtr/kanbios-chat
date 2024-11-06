import { ValidationArguments } from 'class-validator';

export interface ContextAwareValidationArguments extends ValidationArguments {
  object: {
    context?: {
      params: Record<string, string>;
    };
  };
}
