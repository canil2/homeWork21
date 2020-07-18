import axios from "axios";

class Service {
  constructor() {}

  bookData(bookData) {
    return new Promise((resolve, reject) => {
      axios
        .put("/api/addbooks", bookData)
        .then(resolve)
        .catch((err) => reject(err));
    });
  }

  getBooks() {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/books")
        .then(resolve)
        .catch((err) => reject(err));
    });
  }

  deleteBook(bookid) {
    return new Promise((resolve, reject) => {
      axios
        .delete("/api/books/" + bookid)
        .then(resolve)
        .catch((err) => reject(err));
    });
  }
}

export default new Service();
