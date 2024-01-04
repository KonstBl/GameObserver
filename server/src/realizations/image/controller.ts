import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ImageService} from "./service";
import {FileInterceptor} from "@nestjs/platform-express";
import {raw, Response} from "express";

@ApiTags('Image module')
@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('upload')
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
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.uploadImage(file)
  }

  @Get(':id')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    return res.sendFile(await this.imageService.getById(id));
  }
}