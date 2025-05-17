import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
// import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
// import { LoggingInterceptor } from './logging.interceptor';
// import { TransformInterceptor } from './interceptor/transform.interceptor';
// import { HttpExceptionFilter } from './exception.filter';
// import { AllExceptionsFilter } from './exception.filter';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
// import { GraphqlModule } from './graphql-demo/graphql-demo.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserModule } from './module/user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';
import { User } from './module/user/user.entity';
import { CategoriesModule } from './module/categories/categories.module';
import { SpeciesModule } from './module/species/species.module';
import { Categories } from './module/categories/categories.entity';
import { Species } from './module/species/species.entity';
import { Product } from './module/products/products.entity';
import { Order } from './module/orders/entities/order.entity';
import { ProductsModule } from './module/products/products.module';
import { OrdersModule } from './module/orders/orders.module';
// import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { PassportModule } from './services/auth/passport.module';
// import { PassportModule } from '@nestjs/passport';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './services/auth/jwt-auth.guard';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Cat, CatSchema } from './schema/cat.schema';

@Module({
  imports: [
    //====================Database=================================================================
    //import module vao
    //cau hinh Orm
    DatabaseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [User, Categories, Species, Product, Order],
        synchronize: true,
      }),
    }),
    //====================EntityModule=================================================================
    UserModule,
    CategoriesModule,
    SpeciesModule,
    ProductsModule,
    OrdersModule,
    // GraphqlModule,
    //cau hinh mongo
    // MongooseModule.forRoot('mongodb://haven:Hao2308@localhost:27019'),
    // MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),

    //======================Graphql=========================================================

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    //======================Config==========================================================
    AppConfigModule,
    PassportModule,
  ],
  providers: [
    // dang ki cai validation pipe o global scope - ap dung cho toan bo app
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
  ],
})
export class AppModule {}
