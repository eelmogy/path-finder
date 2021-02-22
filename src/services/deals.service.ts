import HttpException from '../exceptions/HttpException';
import { Deal } from '../interfaces/deals.interface';
import dealsModel from '../models/deals.model';
import fs from 'fs';

class DealsService {
  public deals = dealsModel;

  public async getDeals(): Promise<Deal[]> {
    const deals: Deal[] = JSON.parse(fs.readFileSync(__dirname+'/../lib/response.json', 'utf8'));
    return deals;
  }

  public async filterDeals(deals: Deal[],sortBy: string): Promise<Deal[]> {
    let sortedDeals: Deal[] = deals;
    if(sortBy === "cheapest"){
      sortedDeals = deals.sort(this.sortDeals("cost","discount", null, "asc",sortBy));
    }

    if(sortBy === "fastest") {
      sortedDeals = deals.sort(this.sortDeals("duration", "h", "m", "asc", sortBy));
    }
    return sortedDeals;
  }

  sortDeals = (prop1:string, prop2:any = null, prop3:any = null, direction: string = 'asc', sortBy: string) => (e1, e2) => {
    const sortOrder = direction === "asc" ? 1 : -1;
    if(sortBy === "fastest") {
      return Number(e1[prop1][prop2]) - Number(e2[prop1][prop2]) || Number(e1[prop1][prop3]) - Number(e2[prop1][prop3]);
    }

    if(sortBy === "cheapest") {
      return ((e1[prop1]- e1[prop2]) < (e2[prop1]- e2[prop2])) ? -sortOrder : ((e1[prop1]- e1[prop2]) > (e2[prop1]- e2[prop2])) ? sortOrder : 0;
    }
  }

}

export default DealsService;
