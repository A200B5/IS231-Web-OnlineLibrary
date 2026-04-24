const borrowedContainer = document.getElementById("borrowedContainer");

function renderBorrowedBooks() {
    const books = getBooks();

    const borrowed = books.filter(book => book.isBorrowed);

    borrowedContainer.innerHTML = "";

    if (borrowed.length === 0) {
        borrowedContainer.innerHTML = `
        <div class="empty-state">
            <h3>No borrowed books</h3>
            <p>You haven’t borrowed anything yet.</p>
        </div>
    `;
        return;
    }

    borrowed.forEach(book => {

        const borrowDateObj = new Date();
        const returnDateObj = new Date();

        returnDateObj.setDate(borrowDateObj.getDate() + 2);

        const borrowDate = borrowDateObj.toLocaleDateString();
        const returnDate = returnDateObj.toLocaleDateString();

        const card = `
    <div class="book-card">

    <div class="book-cover">
        <img src="${book.image}" style="width:100%; height:100%; object-fit:cover;">
    </div>

    <div class="book-content">

        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>

        <div class="book-dates">
            <div>📅 Borrowed: ${borrowDate}</div>
            <div>📅 Return: ${returnDate}</div>
        </div>

        <div class="book-actions">
            <button class="borrow-btn" onclick="returnBook(${book.id})">
                Return
            </button>

            <button class="details-btn" onclick="goToDetails(${book.id})">
                Details
            </button>
        </div>

    </div>

</div>
`;

        borrowedContainer.innerHTML += card;
    });
}

function returnBook(id) {
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

        renderBorrowedBooks();
    }
}

renderBorrowedBooks();
