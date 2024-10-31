import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';

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

  public async create(userCreateDto: UserCreateDto): Promise<User> {
    const user = new User();
    user.firstName = userCreateDto.firstName;
    user.lastName = userCreateDto.lastName;
    user.email = userCreateDto.email;
    user.password = userCreateDto.password;

    return await this.userRepository.save(user);
  }

  public async getUserPassword(userId: number): Promise<string | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['password'],
    });

    return user?.password;
  }
}
