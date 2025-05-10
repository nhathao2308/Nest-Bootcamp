import { PetEntity } from 'src/module/pets/entities/pet.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  fullName: string;

  @Column()
  gender: string;

  @Column({ default: 'activate' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //typeORM la onetomany seque la HasMany
  @OneToMany(() => PetEntity, (pet) => pet.owner)
  pets: PetEntity[];
}
