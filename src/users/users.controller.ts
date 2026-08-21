import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserQuery } from './dtos/userQuery.dto';
import { IsAuthGuard } from 'src/guards/isAuth.guard';
import { UserId } from './decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('upgrade-subscription')
  @UseGuards(IsAuthGuard)
  upgradeSubscription(@UserId() userId: string) {
    return this.usersService.upgradeSubscription(userId);
  }

  @Get()
  getUsers(@Query() PaginationDto: UserQuery) {
    return this.usersService.getUsers(PaginationDto);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard)
  deleteById(@Param('id') id: string, @UserId() userId: string) {
    return this.usersService.deleteUserById(id, userId);
  }

  @Patch(':id')
  @UseGuards(IsAuthGuard)
  updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UserId() userId: string,
  ) {
    return this.usersService.updateUserById(id, userId, updateUserDto);
  }
}
