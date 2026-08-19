/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class CreateExpensePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const supportedCategories = [
      'shopping',
      'food',
      'sport',
      'technic',
      'travel',
    ];

    if (!value.category || value.price === undefined) {
      throw new BadRequestException('Category and price missing');
    }

    if (!supportedCategories.includes(value.category as string)) {
      throw new BadRequestException('Unsupported category');
    }

    const price = Number(value.price);
    const quantity = Number(value.quantity);

    if (isNaN(price) || price < 0) {
      throw new BadRequestException('Wrong price');
    }

    if (isNaN(quantity) || quantity <= 0) {
      throw new BadRequestException('Wrong quantity');
    }

    return {
      ...value,
      price,
    };
  }
}
