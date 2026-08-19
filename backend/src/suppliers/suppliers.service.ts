import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(@InjectRepository(Supplier) private repo: Repository<Supplier>) {}

  findAll() { return this.repo.find({ relations: ['parts'] }); }
  findOne(id: string) { return this.repo.findOne({ where: { id }, relations: ['parts'] }); }
  create(data: any) { const s = this.repo.create(data); return this.repo.save(s); }
  update(id: string, data: any) { return this.repo.update(id, data); }
  remove(id: string) { return this.repo.delete(id); }
}
