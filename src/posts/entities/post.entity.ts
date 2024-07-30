import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Post {
    // 기본 키. 테이블에서 행을 고유하게 식별하는 데 사용되는 열
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;
}
