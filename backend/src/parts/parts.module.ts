import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from '../entities/part.entity';
import { PriceHistory } from '../entities/price-history.entity';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { Supplier } from '../entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part, PriceHistory, Supplier])],
  providers: [PartsService],
  controllers: [PartsController],
})
export class PartsModule {}
