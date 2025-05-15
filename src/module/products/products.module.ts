import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from '../categories/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
