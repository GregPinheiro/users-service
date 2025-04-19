import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email: string | null;
}
