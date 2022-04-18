import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);

  //app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Server Blog')
    .setDescription('REST-API documentation')
    .setVersion('1.0.0')
    .addTag('Stanislav Pilguy')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () =>
    console.log(`Server started on port => ${PORT}`),
  );
}
bootstrap();
