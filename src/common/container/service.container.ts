import { AppError } from "@/middlewares/errorHandler.js";
import { StatusCodes } from "http-status-codes";

export class ServiceContainer {
  private static instance: ServiceContainer;
  private services: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  set(key: Services, service: any): void {
    this.services.set(key, service);
  }

  get<T>(key: Services): T {
    const service = this.services.get(key);
    if (!service) {
      throw new AppError(
        `Service ${key} not found in container`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    return service as T;
  }
}

export enum Services {
  COMMAND_BUS = "COMMAND_BUS",
  QUERY_BUS = "QUERY_BUS",
  DATABASE = "DATABASE",
}
