import { LogEntity, LogSeverityLevel } from '../entities/log.entitiy';

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
