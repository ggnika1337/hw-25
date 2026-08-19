import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './entities/product.entity';
import { request } from 'http';

@Injectable()
export class ProductsService {
  private products: IProduct[] = [
    {
      id: 1,
      name: 'shirt',
      quantity: 2,
      price: 50,
      category: 'shopping',
      description: 'description',
    },
  ];

  create(dto: CreateProductDto) {
    const lastId = this.products[this.products.length - 1]?.id || 0;

    const newProduct: IProduct = {
      id: lastId + 1,
      name: dto.name,
      category: dto.category,
      quantity: dto.quantity,
      price: dto.price,
      description: dto.description,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  findAll(hasDiscount: boolean) {
    if (hasDiscount) {
      return this.products.map((product) => ({
        ...product,
        price: product.price / 2,
      }));
    }

    return this.products;
  }

  findOne(id: number, hasDiscount: boolean) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    if (hasDiscount) {
      return {
        ...product,
        price: product.price / 2,
      };
    }

    return product;
  }
  update(id: number, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const updateReq: Partial<IProduct> = {};

    if (updateProductDto.name) {
      updateReq.name = updateProductDto.name;
    }

    if (updateProductDto.price) {
      updateReq.price = updateProductDto.price;
    }

    if (updateProductDto.quantity) {
      updateReq.quantity = updateProductDto.quantity;
    }

    if (updateProductDto.category) {
      updateReq.category = updateProductDto.category;
    }

    if (updateProductDto.description) {
      updateReq.description = updateProductDto.description;
    }

    this.products[index] = {
      ...this.products[index],
      ...updateReq,
    };

    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }

    const [deletedProduct] = this.products.splice(index, 1);
    return deletedProduct;
  }
}
