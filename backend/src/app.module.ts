import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsModule } from './parts/parts.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'app',
      password: process.env.DB_PASS || 'changeme',
      database: process.env.DB_NAME || 'workshop',
      autoLoadEntities: true,
      synchronize: true
    }),
    PartsModule,
    SuppliersModule,
    ClientsModule,
  ],
})
export class AppModule {}
