import e from 'express';
import path from 'path';
import { config } from 'dotenv';
import { createServer } from 'http';

import renderApp from './app';

config();

const { PORT } = process.env;
const app = e();
const server = createServer(app);

app.use(
  e.static(
    path.resolve('dist'),
    { index: false },
  ),
);

app.use(renderApp);

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
