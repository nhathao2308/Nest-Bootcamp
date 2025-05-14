import { registerEnumType } from '@nestjs/graphql';

export enum AnimalType {
  SNAKE = 'snake',
  SPIDER = 'spider',
}

registerEnumType(AnimalType, {
  name: 'AnimalType',
  description: 'The type of animal',
});
