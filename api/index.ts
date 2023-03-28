import { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import pinoHttp from 'pino-http'
import httpErrors from 'http-errors';
import config from './config';
import dialogEngineRoutes from './dialogue-engine/dialogue-engine.routes';
import LOGGER from './logger';

const express = require('express');


// Server state
let server;
let serverStarted = false;
let serverClosing = false;


const attachNotFoundHandler = (app: Express) => {
  app.use((req, res, next) => {
    next(httpErrors(404, `Route not found: ${req.url}`));
  });
};

const attachInternalErrorHandler = (app: Express) => {
  app.use((err, req, res, next) =>  {
    if (err.status >= 500) {
      LOGGER.error(err);
    }
    res.status(err.status || 500).json({
      messages: [
        {
          code: err.code || err.statusCode || 'InternalServerError',
          message: err.message,
        },
      ],
    });
  });
};

const attachCommonErrorHandlers = (app: Express) => {
  attachNotFoundHandler(app);
  attachInternalErrorHandler(app);
}

const unhandledError = (err) => {
  // Log the errors
  LOGGER.error(err);

  // Only clean up once
  if (serverClosing) {
    return;
  }
  serverClosing = true;

  // If server has started, close it down
  if (server && serverStarted) {
    server.close(function () {
      process.exit(1);
    });
  }
}

process.on('uncaughtException', unhandledError);
process.on('unhandledRejection', unhandledError);


const app: Express = express();
const PORT = config.PORT

const router = express.Router();

app.use(cors());
app.use(pinoHttp({ LOGGER }));

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());


// Route handler for root URL
app.get('/', async (req: Request, res: Response) => {
  res.send({ response: 'Welcome to BugChat' });
});

app.use('/api', router);
router.use('/dialog-engine', dialogEngineRoutes);

attachCommonErrorHandlers(app);

// Start the server
try {
  server = app.listen(PORT, () => {
    LOGGER.info(
      `Server Started at localhost:${PORT}`,
    );
    serverStarted = true;
  });
} catch (err) {
  if (serverClosing) {
    throw new Error('Server was closed before it could start');
  }
  throw new err;
}

