import fs from 'fs';

import { LogDataSource } from '../../domain/datasource/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entitiy';

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-all.log';
  private readonly midiumLogsPath = 'logs/logs-midium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.midiumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, '');
      }
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);
    if (newLog.level === LogSeverityLevel.low) return;
    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.midiumLogsPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  private getLogFromFile = (path: string): LogEntity[] => {
    const logs = fs
      .readFileSync(path, 'utf8')
      .split('\n')
      .map((log) => LogEntity.fromJson(log));
    return logs;
  };

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogFromFile(this.midiumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogFromFile(this.highLogsPath);
      default:
        throw new Error(`${severityLevel} is not a valid severity level`);
    }
  }
}
