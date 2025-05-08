import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
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
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    //cau hinh mongo
    // MongooseModule.forRoot('mongodb://haven:Hao2308@localhost:27019'),
    // MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
