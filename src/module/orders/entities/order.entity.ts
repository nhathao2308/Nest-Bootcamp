import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Status } from 'src/enums/status.enum';
import { Product } from 'src/module/products/products.entity';
import { User } from 'src/module/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Date)
  order_date: Date;

  @Column()
  @Field(() => String)
  payment_method: string;

  @Column('float')
  @Field(() => Float)
  shipping_cost: number;

  @Column('float')
  @Field(() => Float)
  subtotal: number;

  @Column('float')
  @Field(() => Float)
  total_amount: number;

  @Column()
  @Field(() => Status)
  order_status: Status;

  @Column()
  @Field(() => Status)
  payment_status: Status;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  note?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  cancel_reason?: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @Field(() => User)
  buyer: User;

  @ManyToOne(() => Product, (product) => product.orders)
  @Field(() => Product)
  product: Product;

  // @ManyToOne(() => Address, (address) => address.orders)
  // @Field(() => Address)
  // shipping_address: Address;
}
