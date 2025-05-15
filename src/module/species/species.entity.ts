import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnimalType } from '../../enums/animal-type.enum';
import { Categories } from '../categories/categories.entity';
import { Product } from '../products/products.entity';
@ObjectType()
@Entity()
export class Species {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  scientific_name: string;

  @Column()
  @Field(() => String)
  common_name: string;

  @Column()
  @Field(() => String)
  family: string;

  @Column()
  @Field(() => String)
  genus: string;

  @Column({
    type: 'enum',
    enum: AnimalType,
  })
  @Field(() => AnimalType)
  animal_type: AnimalType;

  @Column()
  @Field(() => String)
  origin: string;

  @Column()
  @Field(() => String)
  care_level: string;

  @Column()
  @Field(() => String)
  description: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;

  @ManyToOne(() => Categories, (category) => category.species)
  @Field(() => Categories)
  category: Categories;

  @OneToMany(() => Product, (product) => product.species)
  @Field(() => [Product])
  products: Product[];
}
