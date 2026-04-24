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
  window.location.href = `admin_book_details.html?id=${id}`;
}


renderBooks();
