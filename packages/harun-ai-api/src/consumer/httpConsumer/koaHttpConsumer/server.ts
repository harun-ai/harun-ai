import { prisma } from '.';
import app from './app';

const port = process.env.PORT || 5000;

const server = app.listen(port, async () => {
  await prisma.$connect();
  console.log(`Koa server started on port: ${port}`);
});

process.on('SIGTERM', async () => {
  console.log(`Closing Koa server on port: ${port}`);
  server.close(async () => {
    await prisma.$disconnect();
  });
  process.exit(0);
});
