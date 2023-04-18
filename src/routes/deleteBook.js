const books = require("../data/data");

const deleteBookRoute = {
  method: "DELETE",
  path: "/books/{id}",
  handler: (request, res) => {
    const bookId = request.params.id;

    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex === -1) {
      return res
        .response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        .code(404);
    }

    books.splice(bookIndex, 1);

    return res
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
  },
};

module.exports = deleteBookRoute;
