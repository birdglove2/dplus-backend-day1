const httpShutdown = require('http-shutdown');
const { connectDB, disconnectDB } = require('./utils/db');
const app = require('./app');

app.get('/', function (req, res) {
  res.send('hello');
  process.exit(1);
});

const start = async () => {
  await connectDB();

  const server = httpShutdown(
    app.listen(3000, () => {
      console.log('listen to port 3000...');
    })
  );

  // graceful shutdown
  let called = false;
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
