import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Supplier } from './supplier.entity';
import { PriceHistory } from './price-history.entity';

@Entity()
export class Part {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  sku: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Supplier, supplier => supplier.parts, { nullable: true, onDelete: 'SET NULL' })
  supplier: Supplier;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: string;

  @OneToMany(() => PriceHistory, history => history.part, { cascade: true })
  history: PriceHistory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
