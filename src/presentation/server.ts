import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class Server {
  public static start() {
    console.log('Server started');

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'http://google.com';
      new CheckService(
        fileSystemLogRepository,
        () => console.log('Success on check service', url),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
