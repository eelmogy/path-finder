import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import DealsRoute from './routes/deals.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new DealsRoute()]);

app.listen();
