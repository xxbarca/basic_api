import { Injectable } from '@nestjs/common';
import * as COS from 'cos-nodejs-sdk-v5';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  private cos: COS;
  constructor(private readonly configService: ConfigService) {
    this.cos = new COS({
      SecretId: this.configService.get<string>('COS_SECRET_ID'),
      SecretKey: this.configService.get<string>('COS_SECRET_KEY'),
    });
  }
  getHello(): string {
    return 'Hello World!';
  }

  async upload(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      this.cos.putObject(
        {
          Bucket: this.configService.get<string>('COS_BUCKET'),
          Region: this.configService.get<string>('COS_REGION'),
          Key: file.originalname,
          Body: file.buffer,
          // ContentDisposition: 'inline',
        },
        (err, data) => {
          console.log(data);
        },
      );
    });
  }

  async getAuth(key: string, expirationTime = 60) {
    const bucket = this.configService.get<string>('COS_BUCKET');
    const region = this.configService.get<string>('COS_REGION');
    const sign = this.cos.getAuth({
      Method: 'PUT',
      Key: key,
      Expires: expirationTime,
      Bucket: bucket,
      Region: region,
    });
    return {
      sign,
      key,
      bucket,
      region,
    };
  }
}
