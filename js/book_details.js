const x = new URLSearchParams(window.location.search);
const id = x.get("id");

let books = JSON.parse(localStorage.getItem("books")) || [];

let book = books.find(b => b.id == id);

document.querySelector(".book-details-card__title").textContent = book.title;
document.querySelector(".book-author").innerHTML = `<strong>Author:</strong> ${book.author}`;
document.querySelector(".book-category").innerHTML = `<strong>Category:</strong> ${book.category}`;
document.querySelector(".book-year").innerHTML = `<strong>Published Year:</strong> ${book.year}`;

const img = document.querySelector(".book-image");
img.src = book.image;

const status = document.querySelector(".status-badge");
const borrowBtn = document.querySelector(".borrow-btn");

function updateUI() {

  status.className = "status-badge";

  if (book.isBorrowed) {
    status.textContent = "Borrowed";
    status.classList.add("status-badge--borrowed");

    borrowBtn.textContent = "Unborrow";
    borrowBtn.disabled = false;

  } else if (book.copies > 0) {
    status.textContent = "Available";
    status.classList.add("status-badge--available");

    borrowBtn.textContent = "Borrow";
    borrowBtn.disabled = false;

  } else {
    status.textContent = "Out of Stock";
    status.classList.add("status-badge--out");

    borrowBtn.textContent = "Unavailable";
    borrowBtn.disabled = true;
  }
}

updateUI();

borrowBtn.onclick = function () {

  if (book.isBorrowed) {
    book.isBorrowed = false;
    book.copies += 1;

  } else {
    if (book.copies <= 0) return;

    book.isBorrowed = true;
    book.copies -= 1;
  }

  localStorage.setItem("selectedBook", JSON.stringify(book));

  books = books.map(b => {
    if (b.id == book.id) {
      return book;
    }
    return b;
  });

  localStorage.setItem("books", JSON.stringify(books));

  updateUI();
};
