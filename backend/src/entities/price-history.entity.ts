import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Part } from './part.entity';

@Entity()
export class PriceHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Part, part => part.history, { onDelete: 'CASCADE' })
  part: Part;

  @Column('decimal', { precision: 10, scale: 2 })
  price: string;

  @CreateDateColumn()
  recordedAt: Date;
}
