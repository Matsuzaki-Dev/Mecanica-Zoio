import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly svc: SuppliersService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const r = await this.svc.findOne(id);
    if (!r) throw new NotFoundException();
    return r;
  }

  @Post()
  create(@Body() body: CreateSupplierDto) { return this.svc.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateSupplierDto) { return this.svc.update(id, body); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.svc.remove(id); }
}
