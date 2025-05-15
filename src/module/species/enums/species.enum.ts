import { registerEnumType } from '@nestjs/graphql';

export enum AnimalType {
  SNAKE = 'snake',
  SPIDER = 'spider',
}

export enum CareLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

registerEnumType(AnimalType, {
  name: 'AnimalType',
  description: 'The type of animal',
});

registerEnumType(CareLevel, {
  name: 'CareLevel',
  description: 'The care level of the animal',
});
