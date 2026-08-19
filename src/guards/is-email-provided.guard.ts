/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class isEmailProvided implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context
      .switchToHttp()
      .getRequest<Request & { hasDiscount: boolean }>();

    const email = req.headers.email;

    if (!email) {
      req.hasDiscount = false;
    } else {
      if (await this.usersService.isSubscriptionValid(email as string)) {
        req.hasDiscount = true;
      } else {
        req.hasDiscount = false;
      }
    }

    return true;
  }
}
