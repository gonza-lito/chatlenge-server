import { Application, Request, Response } from 'express';

import { IController } from './IController';

export class UserController implements IController {
    public registerRoutes(app: Application): void {
        app.post('/login', this.logIn);
    }

    public logIn(req: Request, res: Response): void {
        res.send({});
    }
}
