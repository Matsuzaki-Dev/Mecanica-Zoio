import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Get()
  findAll() { return this.partsService.findAll(); }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const r = await this.partsService.findOne(id);
    if (!r) throw new NotFoundException();
    return r;
  }

  @Post()
  create(@Body() body: CreatePartDto) { return this.partsService.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdatePartDto) {
    return this.partsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.partsService.remove(id); }

  @Get(':id/history')
  getHistory(@Param('id') id: string) { return this.partsService.getHistory(id); }
}
