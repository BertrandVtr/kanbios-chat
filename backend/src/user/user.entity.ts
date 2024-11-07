import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "Id de l'utilisateur" })
  id: number;

  @Column()
  @ApiProperty({ description: 'Email' })
  email: string;

  @Column()
  @ApiProperty({ description: 'Prénom' })
  firstName: string;

  @Column()
  @ApiProperty({ description: 'Nom de famille' })
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ description: 'Date de création' })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ description: 'Date de mise à jour' })
  updatedAt: Date;

  constructor(data?: Partial<User>) {
    Object.assign(this, data);
  }
}
