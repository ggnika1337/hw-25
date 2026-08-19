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

@Controller('products')
@UseGuards()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
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
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
