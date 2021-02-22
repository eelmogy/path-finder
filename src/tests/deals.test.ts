import request from 'supertest';
import App from '../app';
import { Deal } from '../interfaces/deals.interface';
import dealsModel from '../models/deals.model';
import DealsRoute from '../routes/deals.route';
import { SortDealsDto } from '../dtos/sort-deals.dto';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Deals', () => {
  describe('[GET] /deals', () => {
    it('response statusCode 200 / get all deals', () => {
      const deals: Deal[] = dealsModel;
      const dealsRoute = new DealsRoute();
      const app = new App([dealsRoute]);

      return request(app.getServer()).get(`${dealsRoute.path}`).expect(200);
    });
  });

  describe('[GET] /deals?sortBy=fastest', () => {
    it('response should return sorted deals by the fastest path', () => {
      const sortData: SortDealsDto = {
        sortBy: 'fastest',
      };
      const dealsRoute = new DealsRoute();
      const app = new App([dealsRoute]);

      return request(app.getServer()).get(`${dealsRoute.path}?sortBy=fastest`).query(sortData).expect(200);
    });
  });


  describe('[GET] /deals?sortBy=cheapest', () => {
    it('response should return sorted deals by the cheapest path', () => {
      const sortData: SortDealsDto = {
        sortBy: 'cheapest',
      };
      const dealsRoute = new DealsRoute();
      const app = new App([dealsRoute]);

      return request(app.getServer()).get(`${dealsRoute.path}?sortBy=cheapest`).query(sortData).expect(200);
    });
  });

});
