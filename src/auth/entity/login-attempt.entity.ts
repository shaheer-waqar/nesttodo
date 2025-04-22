import { User } from 'src/user/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class LoginAttempt extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  access_token: string;

  @Column({ nullable: true })
  expire_at: Date;

  @Column({ nullable: true })
  logout_at: Date;

  @Column({ nullable: true })
  platform: string;

  @Column({ nullable: true })
  ip_address: string;

  @Column()
  user_agent: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;


  @ManyToOne(()=>User , (user)=> user.login_attempt)
  user:User
}
