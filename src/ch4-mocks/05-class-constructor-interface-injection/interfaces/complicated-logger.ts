export interface IComplicatedLogger {
  info(text: string): void;
  debug(text: string, obj: never): void;
  warn(text: string): void;
  error(text: string, location: string, stacktrace: string): void;
}
