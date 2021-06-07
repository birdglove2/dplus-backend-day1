const app = require('./app');
const httpShutdown = require('http-shutdown');
const { connectDB, disconnectDB } = require('./utils/db');

const start = async () => {
  await connectDB();

  var server = httpShutdown(
    app.listen(3000, () => {
      console.log('listen to port 3000...');
    })
  );

  // graceful shutdown
  var called = false;
  const shutdown = () => {
    if (called) return;
    called = true;
    console.log('shutdown');
    server.shutdown(async (err) => {
      try {
        await disconnectDB();
        console.log('disconnect');
        return process.exit(0);
      } catch (e) {
        err = e;
      }
      console.error(err);
      return process.exit(1);
    });
  };
  process.once('SIGINT', shutdown).once('SIGTERM', shutdown);
};

start();
