import { UsersPermissionsEnum } from 'src/common/user-permissions.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: UsersPermissionsEnum, nullable: false })
  permission: UsersPermissionsEnum[];

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity)
  user: string;
}
