import { NextFunction, Request, Response } from 'express';
import { Deal } from '../interfaces/deals.interface';
import DealsService from '../services/deals.service';

class DealsController {
  public dealsService = new DealsService();

  public getDeals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sortBy: any = req.query.sortBy;
      let deals: any = await this.dealsService.getDeals();
      if(sortBy) {
        deals = await this.dealsService.filterDeals(deals.deals,sortBy);
      }

      res.status(200).json({ data: deals });
    } catch (error) {
      next(error);
    }
  };

  public filterDeals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sortBy = String(req.query.sortBy);
      const deals: any = await this.dealsService.getDeals();
      const sortedDeals: Deal[] = await this.dealsService.filterDeals(deals.deals,sortBy);
      res.status(200).json({ data: sortedDeals });
    } catch (error) {
      next(error);
    }
  };
}

export default DealsController;
