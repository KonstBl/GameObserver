import {Injectable} from "@nestjs/common";
import * as path from "path";
import {createWriteStream} from "fs";

const UPLOAD_PATH = path.join(process.cwd(), 'src/images/')

@Injectable()
export class UploadService {
  generateUniqueName() {
    return Date.now().toString() + Math.floor(Math.random() * 1000).toString()
  }

  uploadImage(file: Express.Multer.File) {
    const splatName = file.originalname.split('.')
    const filename = this.generateUniqueName() + '.' + splatName[splatName.length - 1]
    const path = UPLOAD_PATH + filename
    const stream = createWriteStream(path);
    stream.write(file.buffer);
    stream.end();

    return {
      filename,
      path
    };
  }
}