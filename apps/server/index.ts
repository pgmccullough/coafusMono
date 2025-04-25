import path = require('path');
import fs = require('fs');
import express = require('express');

import cms = require('@org/cms');
import shared = require('@org/shared');
import webExpressAdapter = require('@org/web/express');

const { payload } = cms;
const { dotenv } = shared;
const { createRequestHandler } = webExpressAdapter;

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const localEnvFilePath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(localEnvFilePath)) {
  const localConfig = dotenv.config({
    path: localEnvFilePath,
    override: true,
  });
  if (localConfig.error) {
    throw localConfig.error;
  }
}

const MONGODB_URL = process.env.MONGODB_URL;
const PAYLOADCMS_SECRET = process.env.PAYLOADCMS_SECRET;
const ENVIRONMENT = process.env.NODE_ENV;

const WEB_BUILD_DIR = path.join(process.cwd(), '../web/build');
const WEB_PUBLIC_DIR = path.join(process.cwd(), '../web/public/web');
const WEB_PUBLIC_BUILD_DIR = path.join(process.cwd(), '../web/public/web/build');

// 🚀 MAIN server start
async function startServer() {
  const app = express();
  app.disable('x-powered-by');

  // Serve static assets
  app.use(
    '/web/build',
    express.static(WEB_PUBLIC_BUILD_DIR, {
      immutable: true,
      maxAge: '1y',
      redirect: false,
    })
  );
  app.use(
    '/web',
    express.static(WEB_PUBLIC_DIR, { maxAge: '1h', redirect: false })
  );

  // Initialize Payload CMS
  await payload.init({
    express: app,
    mongoURL: MONGODB_URL,
    secret: PAYLOADCMS_SECRET,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // ✅ Now it's safe to use Payload middlewares
  app.use(payload.authenticate);

  app.all(
    '*',
    ENVIRONMENT === 'development'
      ? (req, res, next) => {
          purgeRequireCache();
          return createRequestHandler({
            build: require(WEB_BUILD_DIR),
            mode: ENVIRONMENT,
            getLoadContext(req, res) {
              return {
                payload: req.payload,
                user: req?.user,
                res,
              };
            },
          })(req, res, next);
        }
      : createRequestHandler({
          build: require(WEB_BUILD_DIR),
          mode: ENVIRONMENT,
          getLoadContext(req, res) {
            return {
              payload: req.payload,
              user: req?.user,
              res,
            };
          },
        })
  );

  const port = process.env.PORT || 80;

  app.listen(port, () => {
    console.log(`✅ Express server listening on port ${port}`);
  });
}

// Run the server
startServer();

// Helper for server-side HMR in development
function purgeRequireCache() {
  for (const key in require.cache) {
    if (key.startsWith(WEB_BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
