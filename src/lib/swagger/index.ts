import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { patchNestJsSwagger } from 'nestjs-zod';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('성민이를 위한 API')
    .setDescription('안되면,, 맘아프다!')
    .setVersion('1.0.0')
    .build();

  patchNestJsSwagger();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
};
