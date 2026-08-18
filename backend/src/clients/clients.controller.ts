import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ApiKeyGuard } from '../common/api-key.guard';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly svc: ClientsService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const r = await this.svc.findOne(id);
    if (!r) throw new NotFoundException();
    return r;
  }

  // Protected endpoint: requires x-api-key header
  @UseGuards(ApiKeyGuard)
  @Post()
  create(@Body() body: CreateClientDto) { return this.svc.create(body); }

  @UseGuards(ApiKeyGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateClientDto) { return this.svc.update(id, body); }

  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) { return this.svc.remove(id); }
}
