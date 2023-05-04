import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  async findAll(): Promise<Service[]> {
    return this.prisma.service.findMany({
      include: {
        comments: true,
      },
    });
  }

  async findOne(id: string): Promise<Service> {
    return this.prisma.service.findUnique({
      where: { id },
      include: {
        comments: true,
      },
    });
  }

  async like(id: string): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    return this.prisma.service.update({
      where: { id },
      data: {
        likes: service.likes + 1,
      },
    });
  }

  async dislike(id: string): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    return this.prisma.service.update({
      where: { id },
      data: {
        dislikes: service.dislikes + 1,
      },
    });
  }

  async comment(id: string, text: string): Promise<Service> {
    return this.prisma.service.update({
      where: { id },
      data: {
        comments: {
          create: {
            text,
          },
        },
      },
      include: {
        comments: true,
      },
    });
  }
  async delete(id: string): Promise<Service> {
    return this.prisma.service.delete({
      where: { id },
    });
  }
}
