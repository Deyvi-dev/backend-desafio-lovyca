import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';

import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ServicesController],
  providers: [ServicesService, PrismaService],
})
export class ServicesModule {}
