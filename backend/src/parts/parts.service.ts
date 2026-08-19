import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from '../entities/part.entity';
import { PriceHistory } from '../entities/price-history.entity';
import { Supplier } from '../entities/supplier.entity';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part) private partsRepo: Repository<Part>,
    @InjectRepository(PriceHistory) private historyRepo: Repository<PriceHistory>,
    @InjectRepository(Supplier) private suppliersRepo: Repository<Supplier>,
  ) {}

  findAll() { return this.partsRepo.find({ relations: ['supplier', 'history'] }); }
  findOne(id: string) { return this.partsRepo.findOne({ where: { id }, relations: ['supplier', 'history'] }); }

  async create(data: any) {
    const part = this.partsRepo.create(data);
    if (data.supplierId) {
      const supplier = await this.suppliersRepo.findOne({ where: { id: data.supplierId } });
      if (supplier) part.supplier = supplier;
    }
    const saved = await this.partsRepo.save(part);
    if (data.price) {
      const h = this.historyRepo.create({ part: saved, price: data.price });
      await this.historyRepo.save(h);
    }
    return this.findOne(saved.id);
  }

  async update(id: string, data: any) {
    const part = await this.partsRepo.findOne({ where: { id } });
    if (!part) return null;
    if (data.supplierId) {
      const supplier = await this.suppliersRepo.findOne({ where: { id: data.supplierId } });
      if (supplier) part.supplier = supplier;
    }
    const previousPrice = part.price;
    Object.assign(part, data);
    const saved = await this.partsRepo.save(part);
    if (data.price && data.price !== previousPrice) {
      const h = this.historyRepo.create({ part: saved, price: data.price });
      await this.historyRepo.save(h);
    }
    return this.findOne(saved.id);
  }

  remove(id: string) { return this.partsRepo.delete(id); }

  getHistory(id: string) { return this.historyRepo.find({ where: { part: { id } }, order: { recordedAt: 'DESC' } }); }
}
