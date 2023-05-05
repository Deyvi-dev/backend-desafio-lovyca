import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from '@prisma/client';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    if (
      !createServiceDto.name ||
      !createServiceDto.description ||
      !createServiceDto.price
    ) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  async findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Service> {
    const service = await this.servicesService.findOne(id);
    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
    return service;
  }

  @Post('like/:id')
  async like(@Param('id') id: string): Promise<Service> {
    const service = await this.servicesService.like(id);
    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
    return service;
  }

  @Post('dislike/:id')
  async dislike(@Param('id') id: string): Promise<Service> {
    const service = await this.servicesService.dislike(id);
    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
    return service;
  }

  @Post('comment/:id')
  async comment(
    @Param('id') id: string,
    @Body() comment: { text: string },
  ): Promise<Service> {
    if (!comment.text) {
      throw new HttpException(
        'Missing required field: text',
        HttpStatus.BAD_REQUEST,
      );
    }
    const service = await this.servicesService.comment(id, comment.text);
    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
    return service;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const service = await this.servicesService.delete(id);
    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
  }
}
