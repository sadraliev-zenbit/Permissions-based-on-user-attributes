import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from '@entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getJWTConfiguration } from '@config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync(getJWTConfiguration()),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
