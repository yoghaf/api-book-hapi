const books = require("../data/data");

const updateBookRoute = {
  method: "PUT",
  path: "/books/{id}",
  handler: (request, h) => {
    const bookId = request.params.id;
    const updatedBook = request.payload;

    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex === -1) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
        .code(404);
    }

    const { name, readPage, pageCount } = updatedBook; // Destructure updatedBook for validation

    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    // Update book data
    books[bookIndex] = {
      ...books[bookIndex],
      ...updatedBook,
    };

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  },
};

module.exports = updateBookRoute;
