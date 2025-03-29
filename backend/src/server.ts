import app from './config/app';
import dotenv from 'dotenv';
dotenv.config();

const port = Number(process.env.PORT) || 5050;
app.listen(port, () =>
  console.log(`Server running at: http://localhost:${port}`)
);
