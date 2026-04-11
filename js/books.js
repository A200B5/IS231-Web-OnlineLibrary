const container = document.getElementById("booksContainer");

function renderBooks() {
    if (!container) return;

    const books = getBooks();
    container.innerHTML = "";

    books.forEach(book => {

        let statusText = "";
        let statusClass = "";
        let statusStyle = "";
        let borrowButton = "";

        if (book.isBorrowed) {
            statusText = "Borrowed";
            statusClass = "borrowed";
            borrowButton = `<button class="unborrow-btn" onclick="unborrowBook(${book.id})">Unborrow</button>`;
        } else if (book.copies === 0) {
            statusText = "Out of Stock";
            statusClass = "out-of-stock";
            borrowButton = `<button disabled>Unavailable</button>`;
        } else {
            statusText = "Available";
            statusClass = "available";
            borrowButton = `<button class="borrow-btn" onclick="borrowBook(${book.id})">Borrow</button>`;
        }

        const card = `
            <div class="book-card">

                <div class="book-cover">
                    <img src="${book.image}" style="width:100%; height:100%; object-fit:cover;">
                </div>

                <div class="book-content">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>

                    <div>
                        📅 ${book.year}
                        <span class="status ${statusClass}">
                            ${statusText}
                        </span>
                    </div>

                    <div class="book-actions">
                        ${borrowButton}

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


function goToDetails(id) {
    window.location.href = `user_book_details.html?id=${id}`;
}

function borrowBook(id) {
    const books = getBooks();
    let book = null;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            book = books[i];
            break;
        }
    }

    if (book && !book.isBorrowed) {
        if (book.copies > 0) {
            book.isBorrowed = true;
            book.copies = book.copies - 1;
            saveBooks(books);
            renderBooks();
        }
    }
}


function unborrowBook(id) {
    const books = getBooks();
    let book = null;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            book = books[i];
            break;
        }
    }

    if (book && book.isBorrowed) {


        book.isBorrowed = false;
        book.copies = book.copies + 1;
        saveBooks(books);
        renderBooks();
    }
}

renderBooks();
