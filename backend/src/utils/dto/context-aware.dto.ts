import { Allow } from 'class-validator';

export class ContextAwareDTO {
  @Allow()
  context?: {
    params: Record<string, string>;
  };
}
