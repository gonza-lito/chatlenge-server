import { Application } from 'express';

export interface IController {
    registerRoutes(app: Application): void;
}