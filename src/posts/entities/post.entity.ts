import { Transform } from 'class-transformer';
import Category from 'src/categories/category.entity';
import User from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Post {
  // PK 만드는데 쓰임. INTEGER AUTO INCREMENT
  @PrimaryGeneratedColumn()
  public id: number;

  /* 
    파라미터 작성하지 않으면 TS의 타입을 보고 알아서 추론함
    작성하면 작성한걸로 만들어짐 https://github.com/typeorm/typeorm/blob/master/docs/entities.md#column-types-for-postgres 여기서 볼 수 있음
   */
  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  @Transform((value) => {
    if (value) {
      return value;
    }
  })
  public category?: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable() // 얘는 한쪽에만 써야됨
  public categories: Category[];
}
