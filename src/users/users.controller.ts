import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserQuery } from './dtos/userQuery.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('upgrade-subscription')
  upgradeSubscription(@Headers('email') email: string) {
    return this.usersService.upgradeSubscription(email);
  }

  @Get()
  getUsers(@Query() PaginationDto: UserQuery) {
    return this.usersService.getUsers(PaginationDto);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      gender: createUserDto.gender,
      phoneNumber: createUserDto.phoneNumber,
      age: createUserDto.age,
    });
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserById(id, updateUserDto);
  }
}
