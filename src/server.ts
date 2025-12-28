import * as mongoose from 'mongoose';
import morgan from 'morgan';

import { buildApp } from './app.js';
import { User } from './db/models/user-schema.js';

const PORT = process.env.PORT || 8080;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017';
const app = buildApp();

const environment = process.env.NODE_ENV || 'development';
app.use(environment === 'development' ? morgan('dev') : morgan('tiny'));

const startServer = async (dbUrl: string) => {
  try {
    await mongoose.connect(dbUrl);

    const server = app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    setTimeout(async () => {
      await User.create({ login: 'Niko', password: '123456' });
    }, 2000);

    return server;
  } catch (error) {
    console.error({ error });
  }
};

const server = await startServer(dbUrl);

if (!server) {
  throw new Error('Server not found!');
}

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
