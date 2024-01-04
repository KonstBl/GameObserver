import {Injectable} from "@nestjs/common";
import {UploadService} from "../upload/service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Image} from "./entity";

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private uploadService: UploadService
  ) {}

  async uploadImage(file: Express.Multer.File) {
    const imageData = this.uploadService.uploadImage(file)
    return this.imageRepository.save({
      src: imageData.path,
      fileName: imageData.filename,
      
    })
  }

  async getById(id: string) {
    const image = await this.imageRepository.findOne({
      where: {
        id
      }
    })
    return image.src
  }
}