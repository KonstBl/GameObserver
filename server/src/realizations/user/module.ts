import { Module } from '@nestjs/common';
import { UserService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity';
import { UserController } from './controller';
import { Blog } from '../blog/entity';
import {ImageModule} from "../image/module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Blog]),
    ImageModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}