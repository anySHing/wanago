import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
