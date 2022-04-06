import { Test, TestingModule } from '@nestjs/testing';
import { AdminCategoriesService } from './admin-categories.service';

describe('AdminCategoriesService', () => {
  let service: AdminCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminCategoriesService],
    }).compile();

    service = module.get<AdminCategoriesService>(AdminCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
