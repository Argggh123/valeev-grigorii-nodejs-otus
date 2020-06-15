import e from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { connect, connection } from 'mongoose';
import { config } from 'dotenv';
import { createServer } from 'http';

import { course } from './routes/course';
import { lesson } from './routes/lesson';
import renderApp from './app';

config();
connect(
  'mongodb+srv://user:uwYjZGk1NpBDXOwL@my-courses-sop9x.gcp.mongodb.net/my-courses',
  { useNewUrlParser: true, useUnifiedTopology: true },
);

const PORT = process.env.PORT || 4000;
const app = e();
const server = createServer(app);
app.use(bodyParser.json());
app.use(
  e.static(
    path.resolve(__dirname),
    { index: false },
  ),
);

app.use('/api/courses', course);
app.use('/api/lessons', lesson);

connection.once('open', () => {
  console.log('connected');
  app.use(renderApp);
});

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
