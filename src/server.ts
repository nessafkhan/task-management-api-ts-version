import App from '@/app';
import IndexRoute from '@routes/index.route';
import TasksRoute from './routes/tasks.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new TasksRoute, new IndexRoute()]);

app.listen();
