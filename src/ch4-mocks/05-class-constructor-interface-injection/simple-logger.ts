// this class might have dependencies on files or network
import type { ILogger } from "./interfaces/logger";

export class SimpleLogger implements ILogger {
  info(text: string): void {
    console.log(text);
  }
}
