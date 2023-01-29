import { PermissionEntity } from '@entities/Permission.entity';
import { UserEntity } from '@entities/User.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPermissionsEnum } from 'src/common/user-permissions.enum';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async createPermission(userId: string) {
    try {
      const permission = this.permissionRepository.create();
      permission.user = userId;
      permission.permission = [UsersPermissionsEnum.DIARY_CREATE];
      await this.permissionRepository.save();
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}
