import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Categories } from './categories.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Categories)
  async createCategory(
    @Args('category') category: CreateCategoryInput,
  ): Promise<Categories> {
    return this.categoriesService.createCategory(category);
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => [Categories])
  async getAllCategories(): Promise<Categories[]> {
    return this.categoriesService.getAllCategories();
  }

  @Query(() => Categories)
  async getCategoryById(@Args('id') id: string): Promise<Categories> {
    return this.categoriesService.getCategoryById(id);
  }
}
