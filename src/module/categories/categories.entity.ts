import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Species } from '../species/species.entity';

@ObjectType()
@Entity()
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  image_url: string;

  @Column()
  @Field(() => Boolean, { defaultValue: true })
  is_active: boolean;

  @Column()
  @Field(() => String)
  description: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;

  @OneToMany(() => Species, (species) => species.category)
  @Field(() => [Species])
  species: Species[];
}
