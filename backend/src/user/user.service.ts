import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { PaginatedResult } from '../utils/interfaces/paginated-result.interface';
import { UserUpdateDto } from './dto/user-update.dto';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async findOneById(
    id: number,
    options: FindOneOptions<User> = {},
  ): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id }, ...options });
  }

  public async findOneByEmail(
    email: string,
    options: FindOneOptions<User> = {},
  ): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email }, ...options });
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findAllWithPagination(
    page: number = 1,
    limit: number = 50,
    where?: FindOptionsWhere<User>,
  ): Promise<PaginatedResult<User>> {
    const offset = (page - 1) * limit;

    const [data, total] = await this.userRepository.findAndCount({
      take: limit,
      skip: offset,
      order: { createdAt: 'asc' },
      where,
    });

    return {
      data,
      total,
      currentPage: page,
      lastPage: Math.ceil(total / limit),
      limit,
    };
  }

  public async create(userCreateDto: UserCreateDto): Promise<User> {
    return await this.userRepository.save(new User(userCreateDto));
  }

  public async update(id: number, userUpdateDto: UserUpdateDto): Promise<User> {
    await this.userRepository.save({ ...userUpdateDto, id });
    return await this.userRepository.findOneBy({ id });
  }

  public async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
