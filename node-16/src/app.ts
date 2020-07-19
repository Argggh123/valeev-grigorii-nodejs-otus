import e from 'express';
import { config } from 'dotenv';
import { getData } from './fetchData';

config();

const app = e();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const data = await getData();
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
