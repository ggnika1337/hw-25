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

// თქვენი დავალებაა წინა 24 დავალებას დაუმატოთ შემდეგი ფუნცქიონალი

// 1) დაამატეთ რეგისტრაცია/ავტორიზაცია JWT ტოკენის გამოყენებით.
// 2) დაამატეთ გარდი და დაიცავით სხვადასხვა როუტები რომ რენდომ იუზერებს არ მიცეთ იმის საშუალება რაც რეგისტრირებულ იუზერებს
// 3) სადაც იუზერების და სხვა რესურსების რეალაცია გაავთ დაამატეთ ლოგიკა რომ იუზერებმა სხვა იუზერების რესურსების წაშლა ან განახლება არ შეძლონ.
// 4) ასევე გაითვალისწინეთ რომ იუზერებს არ უნდა ჰქონდეთ სხვისი ხარჯების წაშლა/განახლების საშუალება.

// რესურსები: https://github.com/Datodia/Gita-backend-3/commit/b9089e2a1dd083a50a872d73dc79d89e7636771a   npm i bcrypt @nestjs/jwt 