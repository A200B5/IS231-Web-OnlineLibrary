// user version
const BOOKS_STORAGE_KEY = "books";

const initialBooks = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin", category: "Programming", year: 2008, available: true, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg" },
    { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self Development", year: 2018, available: true, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/51-nXsSRfZL.jpg" },
    { id: 3, title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming", year: 1999, available: true, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/41as+WafrFL.jpg" },
    { id: 4, title: "Deep Work", author: "Cal Newport", category: "Productivity", year: 2016, available: true, copies: 3, isBorrowed: false, image: "https://images.epagine.fr/is/2864/9780349411903_1_75.jpg" },
    { id: 5, title: "Design Patterns", author: "Erich Gamma", category: "Programming", year: 1994, available: true, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/71sjeQGh7VL.jpg" },
    { id: 6, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Finance", year: 1997, available: true, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/51AHZGhzZEL.jpg" },
    { id: 7, title: "Think and Grow Rich", author: "Napoleon Hill", category: "Finance", year: 1937, available: true, copies: 3, isBorrowed: false, image: "https://diwanegypt.com/wp-content/uploads/2020/08/9780449214923.jpg" },
    { id: 8, title: "You Don’t Know JS", author: "Kyle Simpson", category: "Programming", year: 2015, available: true, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1585414018i/52764087.jpg" },
    { id: 9, title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Programming", year: 2018, available: true, copies: 3, isBorrowed: false, image: "https://eloquentjavascript.net/img/cover.jpg" },
    { id: 10, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", year: 1988, available: true, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg" },
    { id: 11, title: "Harry Potter", author: "J.K. Rowling", category: "Fiction", year: 1997, available: true, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/51UoqRAxwEL.jpg" },
    { id: 12, title: "The Power of Habit", author: "Charles Duhigg", category: "Self Development", year: 2012, available: true, copies: 3, isBorrowed: false, image: "https://media.shortform.com/covers/png/the-power-of-habit-cover.png" },
    { id: 13, title: "Start with Why", author: "Simon Sinek", category: "Business", year: 2009, available: true, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/71NBZIExBCL._AC_UF1000,1000_QL80_.jpg" },
    { id: 14, title: "Zero to One", author: "Peter Thiel", category: "Business", year: 2014, available: true, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/51zGCdRQXOL._AC_UF1000,1000_QL80_.jpg" },
    { id: 15, title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Programming", year: 2009, available: true, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/61ZYxrQEpCL._AC_UF1000,1000_QL80_.jpg" },
    { id: 16, title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", category: "Self Development", year: 1989, available: true, copies: 3, isBorrowed: false, image: "https://diwanegypt.com/wp-content/uploads/2020/12/9781471195204.jpg" }
];

function safeLoadBooks() {
    const raw = localStorage.getItem(BOOKS_STORAGE_KEY);
    if (!raw) return null;
    try {
        const data = JSON.parse(raw);
        return Array.isArray(data) ? data : null;
    } catch {
        return null;
    }
}

if (!safeLoadBooks()) {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(initialBooks));
}


function getBooks() {
    const raw = localStorage.getItem(BOOKS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function getBookById(id) {
    const books = getBooks();

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            return books[i];
        }
    }

    return null;
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
