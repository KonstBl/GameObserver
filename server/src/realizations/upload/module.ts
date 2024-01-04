import {Module} from "@nestjs/common";
import {UploadController} from "./controller";
import {UploadService} from "./service";

@Module({
  imports: [],
  providers: [UploadService],
  controllers: [UploadController],
  exports: [UploadService]
})
export class UploadModule {}