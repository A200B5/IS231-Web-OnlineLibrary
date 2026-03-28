const borrowedContainer = document.getElementById("borrowedContainer");

function renderBorrowedBooks() {
    const books = getBooks();

    const borrowed = books.filter(book => !book.available);

    borrowedContainer.innerHTML = "";


    borrowed.forEach(book => {

        const borrowDateObj = new Date();
        const returnDateObj = new Date();

        returnDateObj.setDate(borrowDateObj.getDate() + 2);

        const borrowDate = borrowDateObj.toLocaleDateString();
        const returnDate = returnDateObj.toLocaleDateString();

        const card = `
            <div class="book-card">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>

                <div class="book-dates">
                    <p>Borrowed Date: ${borrowDate}</p>
                    <p>Return Date: ${returnDate}</p>
                </div>

                <button class="btn btn-success" onclick="returnBook(${book.id})">
                    Return Now
                </button>
            </div>
        `;

        borrowedContainer.innerHTML += card;
    });
}

function returnBook(id) {
    const books = getBooks();

    const book = books.find(b => b.id === id);

    if (book) {
        book.available = true;
        saveBooks(books);

        renderBorrowedBooks();
    }
}

renderBorrowedBooks();
