import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Address from '../address.entity';
import Post from 'src/posts/entities/post.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  // 유니크 제약조건 설정
  @Column({ unique: true })
  @Expose()
  public email: string;

  @Column()
  @Expose()
  public name: string;

  @Column()
  public password: string; // Exclude 데코레이션을 사용하여 응답 결과에서 비밀번호를 제외

  @OneToOne(() => Address, {
    eager: true, // true로 할 경우 User를 가져올 때 항상 Address를 포함해서 가져오게 됨
    cascade: true, // true일 경우 User를 저장할 때 Address 정보를 추가적으로 넣으면서 같이 저장할 수 있음
  })
  @JoinColumn()
  public address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];
}
