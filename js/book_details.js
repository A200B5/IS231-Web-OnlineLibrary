const book = JSON.parse(localStorage.getItem("selectedBook"));

document.querySelector(".book-details-card__title").textContent = book.title;
document.querySelector(".book-author").textContent = book.author;
document.querySelector(".book-category").textContent = book.category;
document.querySelector(".book-year").textContent = book.year;

const img = document.querySelector(".book-image");
img.src = book.image;

const status = document.querySelector(".status-badge");

if (book.available) {
  status.textContent = "Available";
} else {
  status.textContent = "Borrowed";
}

const borrowBtn = document.querySelector(".borrow-btn");

borrowBtn.onclick = function () {
  book.available = false;

  localStorage.setItem("selectedBook", JSON.stringify(book));

  let books = JSON.parse(localStorage.getItem("books"));

  books = books.map(b => {
    if (b.id === book.id) {
      return { ...b, available: false };
    }
    return b;
  });

  localStorage.setItem("books", JSON.stringify(books));

  status.textContent = "Borrowed";
  borrowBtn.textContent = "Borrowed";
  borrowBtn.disabled = true;
};
