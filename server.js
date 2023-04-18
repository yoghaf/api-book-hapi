const Hapi = require("@hapi/hapi");

// Import routes
const createBookRoute = require("./src/routes/createBook");
const deleteBookRoute = require("./src/routes/deleteBook");
const getBooksRoute = require("./src/routes/getBooks");
const getBookByIdRoute = require("./src/routes/getBookbyId");
const updateBookRoute = require("./src/routes/updateBook");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["0"],
      },
    },
  });

  // Register routes
  server.route(createBookRoute);
  server.route(deleteBookRoute);
  server.route(getBooksRoute);
  server.route(getBookByIdRoute);
  server.route(updateBookRoute);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
