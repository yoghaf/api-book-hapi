const books = require("../data/data");

const createBookRoute = {
  method: "POST",
  path: "/books",
  handler: async (request, res) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    try {
      const { nanoid } = await import("nanoid");

      if (!name || typeof name !== "string") {
        return res
          .response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
          })
          .code(400);
      }
      if (readPage > pageCount) {
        return res
          .response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
          })
          .code(400);
      }

      const id = nanoid(10);

      const book = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        insertedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      books.push(book);

      return res
        .response({
          status: "success",
          message: "Buku berhasil ditambahkan",
          data: {
            bookId: id,
          },
        })
        .code(201);
    } catch (err) {
      console.error(err);
      return res
        .response({
          status: "error",
          message: "Terjadi kesalahan pada server",
        })
        .code(500);
    }
  },
};

module.exports = createBookRoute;
