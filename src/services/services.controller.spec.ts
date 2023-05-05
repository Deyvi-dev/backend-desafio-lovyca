import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';

const mockService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  like: jest.fn(),
  dislike: jest.fn(),
  comment: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe('ServicesController', () => {
  let controller: ServicesController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [
        {
          provide: ServicesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ServicesController>(ServicesController);
  });

  describe('create', () => {
    it('should create a new service', async () => {
      const service = {
        id: '1',
        name: 'Service 1',
        description: 'Description of service 1',
        price: 10,
        likes: 0,
        dislikes: 0,
        comments: [],
      };

      mockService.create.mockReturnValue(service);
      const dto: CreateServiceDto = {
        name: 'Service 1',
        description: 'Description of service 1',
        price: 10,
        likes: 0,
        dislikes: 0,
      };

      expect(await controller.create(dto)).toBe(service);
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });
    it('should throw an exception if required fields are missing', async () => {
      const dto: CreateServiceDto = {
        name: 'Service 1',
        description: 'Description of service 1',
        price: 10,
        likes: 0,
        dislikes: 0,
      };

      delete dto.name;

      await expect(controller.create(dto)).rejects.toThrow(
        'Missing required fields',
      );
    });
  });

  afterAll(async () => {
    await module.close();
  });
});
