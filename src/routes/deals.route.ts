import { Router } from 'express';
import DealsController from '../controllers/deals.controller';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class DealsRoute implements Route {
  public path = '/deals';
  public router = Router();
  public dealsController = new DealsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.dealsController.getDeals);
  }
}

export default DealsRoute;
