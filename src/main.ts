import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validateCustomDecorators: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// თქვენი დავალებაა წინა დავალებებს ანუ  20, 21, 22 დაუმატოთ მონგოდბ ის იმპლემენტაცია

// 1) იუზერებზე, იქსფენსებზე, პროდუქტებზე

// 2) თქვენით განსაზღვფრეთ რომელ კოლექციებს შორის იქნება რელაცია მაგალთად, იუზერებსად და იქსფენსებს შორის.

// 3) შეეცადეთ ქრადის დროს ყველაფერი გააკეთოთ სწორად, და არ გამოგრჩეთ წაშლა ან განახლება ან რაიმე სხვა, ასევე ვალიდაციები.

// უნდა გამოიყენოთ @nestjs/mongoose mongoose @nestjs/config
