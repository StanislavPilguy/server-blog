import { Test, TestingModule } from '@nestjs/testing';
import { AdminCategoriesController } from './admin-categories.controller';

describe('AdminCategoriesController', () => {
  let controller: AdminCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminCategoriesController],
    }).compile();

    controller = module.get<AdminCategoriesController>(AdminCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
