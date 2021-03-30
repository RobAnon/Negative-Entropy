import next from 'next';
import { createServer } from 'http';
import apolloServer from './apollo-server';
import app from './app';
import { connect as connectMongoDB } from './db/mongo';

// http
const port = process.env.PORT || '3000';
const httpServer = createServer();

// next
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const nextHandle = nextApp.getRequestHandler();

// apollo
apolloServer.applyMiddleware({ app, path: '/api' });
apolloServer.installSubscriptionHandlers(httpServer);

async function start() {
  await connectMongoDB();
  await nextApp.prepare();
  app.all('*', nextHandle);
  httpServer.on('request', app.handler);
  httpServer.listen({ port }, () => {
    console.log(`🚀  Apollo API ready at :${port}${apolloServer.graphqlPath}`);
    console.log(
      `🚀  Apollo WS ready at :${port}${apolloServer.subscriptionsPath}`
    );
  });
}

start();