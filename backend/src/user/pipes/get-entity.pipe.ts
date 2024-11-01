import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

interface GetEntityPipeOptions {
  property?: string;
  optional?: boolean;
}

export const GetEntityPipe = (options: GetEntityPipeOptions = {}) => {
  @Injectable()
  class GetEntityPipe implements PipeTransform {
    constructor(@InjectEntityManager() readonly entityManager: EntityManager) {}

    async transform(value: string, metadata: ArgumentMetadata): Promise<any> {
      const { property = 'id', optional = false } = options;
      const { metatype } = metadata;
      const entity = await this.entityManager.findOne(metatype, {
        where: { [property]: value },
      });

      if (!optional && !entity) {
        throw new NotFoundException();
      }

      return entity;
    }
  }

  return GetEntityPipe;
};
