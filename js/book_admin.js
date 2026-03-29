// admin version of books.js
const BOOKS_STORAGE_KEY = "books";

const initialBooks = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", category: "Programming", year: 2008, available: true, copies: 3, image: "https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg" },
  { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self Development", year: 2018, available: true, copies: 3, image: "https://m.media-amazon.com/images/I/51-nXsSRfZL.jpg" },
  { id: 3, title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming", year: 1999, available: true, copies: 3, image: "https://m.media-amazon.com/images/I/41as+WafrFL.jpg" },
  { id: 4, title: "Deep Work", author: "Cal Newport", category: "Productivity", year: 2016, available: true, copies: 3, image: "https://images.epagine.fr/is/2864/9780349411903_1_75.jpg" },
  { id: 5, title: "Design Patterns", author: "Erich Gamma", category: "Programming", year: 1994, available: false, copies: 3, image: "https://m.media-amazon.com/images/I/71sjeQGh7VL.jpg" },
  { id: 6, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Finance", year: 1997, available: true, copies: 3, image: "https://m.media-amazon.com/images/I/51AHZGhzZEL.jpg" },
  { id: 7, title: "Think and Grow Rich", author: "Napoleon Hill", category: "Finance", year: 1937, available: true, copies: 3, image: "https://diwanegypt.com/wp-content/uploads/2020/08/9780449214923.jpg" },
  { id: 8, title: "You Don’t Know JS", author: "Kyle Simpson", category: "Programming", year: 2015, available: true, copies: 3, image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1585414018i/52764087.jpg" },
  { id: 9, title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Programming", year: 2018, available: true, copies: 3, image: "https://eloquentjavascript.net/img/cover.jpg" },
  { id: 10, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", year: 1988, available: true, copies: 3, image: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg" },
  { id: 11, title: "Harry Potter", author: "J.K. Rowling", category: "Fiction", year: 1997, available: false, copies: 3, image: "https://m.media-amazon.com/images/I/51UoqRAxwEL.jpg" },
  { id: 12, title: "The Power of Habit", author: "Charles Duhigg", category: "Self Development", year: 2012, available: true, copies: 3, image: "https://media.shortform.com/covers/png/the-power-of-habit-cover.png" },
  { id: 13, title: "Start with Why", author: "Simon Sinek", category: "Business", year: 2009, available: true, copies: 3, image: "https://m.media-amazon.com/images/I/71NBZIExBCL._AC_UF1000,1000_QL80_.jpg" },
  { id: 14, title: "Zero to One", author: "Peter Thiel", category: "Business", year: 2014, available: true, copies: 3, image: "https://m.media-amazon.com/images/I/51zGCdRQXOL._AC_UF1000,1000_QL80_.jpg" },
  { id: 15, title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Programming", year: 2009, available: true, copies: 3, image: "https://m.media-amazon.com/images/I/61ZYxrQEpCL._AC_UF1000,1000_QL80_.jpg" },
  { id: 16, title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", category: "Self Development", year: 1989, available: true, copies: 3, image: "https://diwanegypt.com/wp-content/uploads/2020/12/9781471195204.jpg" }
];

if (!localStorage.getItem(BOOKS_STORAGE_KEY)) {
  localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(initialBooks));
}

function getBooks() {
  return JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY)) || [];
}

function saveBooks(books) {
  localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
}


const container = document.getElementById("booksContainer");

function renderBooks() {
  if (!container) return;

  const books = getBooks();
  container.innerHTML = "";

  books.forEach(book => {

    const isAvailable = book.copies > 0;
    const statusText = isAvailable ? "Available" : "Out of Stock";
    const statusClass = isAvailable ? "available" : "out-of-stock";

    const card = `
      <div class="book-card">

        <div class="book-cover">
          <img src="${book.image}" style="width:100%; height:100%; object-fit:cover;">
        </div>

        <div class="book-content">
          <div class="book-title">${book.title}</div>
          <div class="book-author">${book.author}</div>

          <div>
            📦 ${book.copies} Copies
            <span class="status ${statusClass}">
              ${statusText}
            </span>
          </div>

          <div class="book-actions">

            <button onclick="increaseCopies(${book.id})">➕</button>
            <button onclick="decreaseCopies(${book.id})">➖</button>

            <button class="details-btn" onclick="goToDetails(${book.id})">
              Details
            </button>

          </div>
        </div>

      </div>
    `;

    container.innerHTML += card;
  });
}



function increaseCopies(id) {
  const books = getBooks();

  let book = null;

  for (let i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      book = books[i];
      break;
    }
  }

  if (book) {
    book.copies++;
    saveBooks(books);
    renderBooks();
  }
  
}

function decreaseCopies(id) {
  const books = getBooks();
  let book = null;

  for (let i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      book = books[i];
      break;
    }
  }

  if (book && book.copies > 0) {
    book.copies--;
    saveBooks(books);
    renderBooks();
  }
}


function goToDetails(id) {
  window.location.href = `admin_books_details.html?id=${id}`;
}


renderBooks();
