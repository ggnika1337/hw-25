import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersModule } from 'src/users/users.module';
import { isEmailProvided } from 'src/guards/is-email-provided.guard';

@Module({
  imports: [UsersModule],
  controllers: [ProductsController],
  providers: [ProductsService, isEmailProvided],
})
export class ProductsModule {}
