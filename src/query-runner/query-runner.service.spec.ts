import { Test, TestingModule } from '@nestjs/testing';
import { QueryRunnerService } from './query-runner.service';

describe('QueryRunnerService', () => {
  let service: QueryRunnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryRunnerService],
    }).compile();

    service = module.get<QueryRunnerService>(QueryRunnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
