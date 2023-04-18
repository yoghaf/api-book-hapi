const books = require("../data/data");

const getBookByIdRoute = {
  method: "GET",
  path: "/books/{id}",
  handler: (request, res) => {
    const bookId = request.params.id;

    const book = books.find((book) => book.id === bookId);

    if (!book) {
      return res
        .response({
          status: "fail",
          message: "Buku tidak ditemukan",
        })
        .code(404);
    }

    return res
      .response({
        status: "success",
        data: {
          book,
        },
      })
      .code(200);
  },
};

module.exports = getBookByIdRoute;
