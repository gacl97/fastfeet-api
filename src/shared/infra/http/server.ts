import 'reflect-metadata'; // Utilizar sintaxe de decorators
import express from 'express';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);
