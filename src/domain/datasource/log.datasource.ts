import { LogEntity, LogSeverityLevel } from '../entities/log.entitiy';

export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
