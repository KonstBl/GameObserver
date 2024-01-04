import { Module } from '@nestjs/common';
import { BlogService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entity';
import { BlogController } from './controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog])
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}