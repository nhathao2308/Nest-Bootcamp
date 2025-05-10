import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './module/users/entities/user.entity';
import { UsersModule } from './module/users/users.module';
import { PetsModule } from './module/pets/pets.module';
import { BreedsModule } from './module/breeds/breeds.module';
import { PetEntity } from './module/pets/entities/pet.entity';
import { BreedEntity } from './module/breeds/entities/breed.entity';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Cat, CatSchema } from './schema/cat.schema';

@Module({
  imports: [
    //import module vao
    //cau hinh Orm
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'hao@123',
      database: 'postgres',
      entities: [UserEntity, PetEntity, BreedEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
    PetsModule,
    BreedsModule,
    //cau hinh mongo
    // MongooseModule.forRoot('mongodb://haven:Hao2308@localhost:27019'),
    // MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
