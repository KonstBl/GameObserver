import {Module} from "@nestjs/common";
import {ImageController} from "./controller";
import {ImageService} from "./service";
import {UploadModule} from "../upload/module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Image} from "./entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    UploadModule
  ],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService]
})
export class ImageModule {}