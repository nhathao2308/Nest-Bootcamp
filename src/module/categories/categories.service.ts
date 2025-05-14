import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './categories.entity';
import { CreateCategoryInput } from './dto/create-category.input';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async createCategory(
    categoryInput: CreateCategoryInput,
  ): Promise<Categories> {
    const category = this.categoriesRepository.create(categoryInput);
    return await this.categoriesRepository.save(category);
  }

  async getAllCategories(): Promise<Categories[]> {
    return await this.categoriesRepository.find();
  }

  async getCategoryById(id: string): Promise<Categories> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }
}
