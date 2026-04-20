export class RealLogger {
  info(text: string): void {
    console.log(text);
  }
  debug(text: string, obj: never): void {
    console.log(text);
    console.log(obj);
  }
  warn(text: string): void {
    console.log(text);
  }
  error(text: string, location: string, stacktrace: string): void {
    console.log(text);
    console.log(location);
    console.log(stacktrace);
  }
}
