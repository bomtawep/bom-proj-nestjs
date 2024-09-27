import { Test, TestingModule } from '@nestjs/testing';
import { QueryRunnerService } from './query-runner.service';
import { DataSource } from 'typeorm';

describe('QueryRunnerService', () => {
  let service: QueryRunnerService;
  let dataSourceMock: Partial<DataSource>;

  beforeEach(async () => {
    dataSourceMock = { query: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryRunnerService,
        {
          provide: DataSource,
          useValue: dataSourceMock,
        },
      ],
    }).compile();

    service = module.get<QueryRunnerService>(QueryRunnerService);

    jest.clearAllMocks();

    expect(service).toBeDefined();
  });
});
