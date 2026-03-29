import dayjs from "dayjs";
import type { TimeProviderInterface } from "./time-provider-interface";

export class RealTimeProvider implements TimeProviderInterface {
  getDay(): number {
    return dayjs().day();
  }
}
