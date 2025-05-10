import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { UserEntity } from './entities/user.entity';
// import { Cat } from './schema/cat.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): Promise<UserEntity> {
  //   return this.appService.getHello();
  // }

  // @Post('cats')
  // createCat(): Promise<Cat> {
  //   return this.appService.createCat();
  // }
}
