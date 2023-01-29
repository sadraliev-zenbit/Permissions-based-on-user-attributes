import { UserEntity } from '@entities/User.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { username, password } = createUserDto;
      const isExist = await this.userRepository.findOneBy({
        username,
      });
      if (isExist) {
        throw new ConflictException();
      }
      const user = this.userRepository.create();
      return await this.userRepository.save({ ...user, username, password });
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const { username } = loginUserDto;
      const user = await this.userRepository.findOneBy({
        username,
      });
      if (!user) {
        throw new NotFoundException();
      }
      const { password, ...result } = user;

      return {
        access_token: this.jwtService.sign(result),
      };
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async all() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}
