const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/db.json'); // Update the path here
const middlewares = jsonServer.defaults({
  static: './build',
});

const port = process.env.PORT || 3500;

server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  }));
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
