import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Species } from '../species/species.entity';
import { Order } from '../orders/entities/order.entity';

@ObjectType()
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String, { nullable: true })
  common_name?: string;

  @Column()
  @Field(() => String, { nullable: true })
  size?: string;

  @Column()
  @Field(() => String, { nullable: true })
  gender?: string;

  @Column()
  @Field(() => Float, { nullable: true })
  weight?: number;

  @Column(() => String)
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field(() => Int)
  stock_quantity: number;

  @Column()
  @Field(() => Boolean, { defaultValue: true })
  is_available: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;

  @ManyToOne(() => Species, (species) => species.products)
  @Field(() => Species)
  species: Species;

  @OneToMany(() => Order, (order) => order.product)
  @Field(() => [Order])
  orders: Order[];
}
