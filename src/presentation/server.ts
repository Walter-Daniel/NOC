import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';

export class Server {
  public static start() {
    console.log('Server started');

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'http://google.com';
      new CheckService(
        () => console.log('Success on check service', url),
        (error) => console.log(`Error on check service: ${error}`)
      ).execute(url);
    });
  }
}
