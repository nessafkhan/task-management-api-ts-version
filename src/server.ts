import App from '@/app';
import TasksRoute from './routes/tasks.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new TasksRoute]);

app.listen();
