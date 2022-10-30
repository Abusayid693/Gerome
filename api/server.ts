import dotenv from 'dotenv';
dotenv.config({path: './config.env'});

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import cors from 'cors';
import express from 'express';
import fileupload from 'express-fileupload';
import {connectDB} from './config/db';
import {errorHandler} from './middlewares/error';
// Routers
import {env} from 'process';
import authRouter from './routes/auth';
import customerRouter from './routes/customer';
import d1Router from './routes/d1';
import d2Router from './routes/d2';
import privateRouter from './routes/private';
import uploadRouter from './routes/upload';

const app = express();

Sentry.init({
  dsn: env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({tracing: true}),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({app})
  ],
  tracesSampleRate: 1.0
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

connectDB();

app.use(express.json());
app.use(fileupload());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/customer', customerRouter);
app.use('/api/private/test', privateRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/d1', d1Router);
app.use('/api/d2', d2Router);

app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      if (error.status !== 200) {
        return true;
      }
      return false;
    }
  })
);

app.use(errorHandler);

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});

process.on('unhandledRejection', (error, promise) => {
  console.log(`[Error]: unhandled rejection Error : ${error}`);
  Sentry.captureException(`Error occoured at ${__filename}.unhandledRejection: ${error}`);
  server.close(() => process.exit(1));
});

module.exports = server;
