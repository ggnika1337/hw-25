import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { IsAuthGuard } from 'src/guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() { age, email, fullName, gender, password }: SignUpDto) {
    return this.authService.signUp({ email, fullName, gender, password, age });
  }

  @Post('sign-in')
  signIn(@Body() { email, password }: SignInDto) {
    return this.authService.signIn({ email, password });
  }

  @Get('current-user')
  @UseGuards(IsAuthGuard)
  getCurrentUser(@UserId() userId) {
    return this.authService.getCurrentUser(userId);
  }
}
