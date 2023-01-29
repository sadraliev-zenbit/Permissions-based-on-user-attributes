import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/guards/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signInUser(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.userService.loginUser(loginUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('users')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JWTAuthGuard)
  async getAllUsers() {
    try {
      return await this.userService.all();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
