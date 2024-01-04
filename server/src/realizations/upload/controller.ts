import {Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {UploadService} from "./service";

@ApiTags('Upload module')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadImage(file)
  }
}