import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Client) private repo: Repository<Client>) {}

  create(data: any) { const c = this.repo.create(data); return this.repo.save(c); }
  findAll() { return this.repo.find(); }
  findOne(id: string) { return this.repo.findOne({ where: { id } }); }
  update(id: string, data: any) { return this.repo.update(id, data); }
  remove(id: string) { return this.repo.delete(id); }
}
