import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { isEmailProvided } from 'src/guards/is-email-provided.guard';
import { IsAuthGuard } from 'src/guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
@UseGuards(ThrottlerGuard)
@Throttle({ default: { limit: 25, ttl: 60000 } })
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(IsAuthGuard)
  create(@Body() createProductDto: CreateProductDto, @UserId() userId: string) {
    return this.productsService.create(createProductDto, userId);
  }

  @Get()
  @UseGuards(isEmailProvided)
  findAll(@Req() req) {
    return this.productsService.findAll(req.hasDiscount);
  }

  @Get(':id')
  @UseGuards(isEmailProvided)
  findOne(@Param('id') id: string, @Req() req) {
    return this.productsService.findOne(+id, req.hasDiscount);
  }

  @Patch(':id')
  @UseGuards(IsAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UserId() userId: string,
  ) {
    return this.productsService.update(+id, updateProductDto, userId);
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard)
  remove(@Param('id') id: string, @UserId() userId: string) {
    return this.productsService.remove(+id, userId);
  }
}
