import { BreedEntity } from 'src/module/breeds/entities/breed.entity';
import { UserEntity } from 'src/module/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class PetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  growthRate: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.pets)
  @JoinColumn()
  owner: UserEntity;

  @ManyToOne(() => BreedEntity, (breed) => breed.pets)
  @JoinColumn()
  breed: BreedEntity;
}
