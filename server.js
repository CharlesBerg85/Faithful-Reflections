// Import the required modules
const jsonServer = require('json-server');
const cors = require('cors');

// Create a new JSON server instance
const server = jsonServer.create();

// Specify the path to the JSON data file
const router = jsonServer.router('data/db.json'); // Update the path here

// Set up default middleware options
const middlewares = jsonServer.defaults({
  static: './build', // Serve static files from the "build" directory
});

// Set the server port
const port = process.env.PORT || 3500;

// Apply the middlewares to the server
server.use(middlewares);

// Mount the router on the server
server.use(router);

// Rewrite the URL pattern for API routes
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}));

// Enable CORS for the server
server.use(cors());

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
