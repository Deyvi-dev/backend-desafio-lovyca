import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from '@prisma/client';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  async findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Service> {
    return this.servicesService.findOne(id);
  }

  @Post(':id/like')
  async like(@Param('id') id: string): Promise<Service> {
    return this.servicesService.like(id);
  }

  @Post(':id/dislike')
  async dislike(@Param('id') id: string): Promise<Service> {
    return this.servicesService.dislike(id);
  }

  @Post(':id/comment')
  async comment(
    @Param('id') id: string,
    @Body() comment: { text: string },
  ): Promise<Service> {
    return this.servicesService.comment(id, comment.text);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.servicesService.delete(id);
  }
}
