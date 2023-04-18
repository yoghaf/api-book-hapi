const books = require("../data/data");

const getBooksRoute = {
  method: "GET",
  path: "/books",
  handler: (request, h) => {
    const { name, reading, finished } = request.query;

    let filteredBooks = [...books];

    if (name) {
      filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (reading) {
      const isReading = reading === "1" ? true : false;
      filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
    }

    if (finished) {
      const isFinished = finished === "1" ? true : false;
      filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
    }

    const simplifiedBooks = filteredBooks.map((book) => {
      return {
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      };
    });

    return h
      .response({
        status: "success",
        data: {
          books: simplifiedBooks,
        },
      })
      .code(200);
  },
};

module.exports = getBooksRoute;
