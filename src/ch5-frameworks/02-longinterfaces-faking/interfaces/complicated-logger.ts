export interface IComplicatedLogger {
  info(text: string, method: string): void;
  warn(text: string, method: string): void;
  error(text: string, method: string): void;
  debug(text: string, method: string): void;
}
