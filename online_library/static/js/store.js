// ============================================================
//  store.js — Single source of truth for all shared state
// ============================================================

const BOOKS_STORAGE_KEY = "books";

const initialBooks = [
    { id: 1,  title: "Clean Code",                          author: "Robert C. Martin",  category: "Programming",      year: 2008, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg" },
    { id: 2,  title: "Atomic Habits",                       author: "James Clear",        category: "Self Development", year: 2018, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/51-nXsSRfZL.jpg" },
    { id: 3,  title: "The Pragmatic Programmer",            author: "Andrew Hunt",        category: "Programming",      year: 1999, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/41as+WafrFL.jpg" },
    { id: 4,  title: "Deep Work",                           author: "Cal Newport",        category: "Productivity",     year: 2016, copies: 3, isBorrowed: false, image: "https://images.epagine.fr/is/2864/9780349411903_1_75.jpg" },
    { id: 5,  title: "Design Patterns",                     author: "Erich Gamma",        category: "Programming",      year: 1994, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/71sjeQGh7VL.jpg" },
    { id: 6,  title: "Rich Dad Poor Dad",                   author: "Robert Kiyosaki",    category: "Finance",          year: 1997, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/51AHZGhzZEL.jpg" },
    { id: 7,  title: "Think and Grow Rich",                 author: "Napoleon Hill",      category: "Finance",          year: 1937, copies: 3, isBorrowed: false, image: "https://diwanegypt.com/wp-content/uploads/2020/08/9780449214923.jpg" },
    { id: 8,  title: "You Don't Know JS",                   author: "Kyle Simpson",       category: "Programming",      year: 2015, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1585414018i/52764087.jpg" },
    { id: 9,  title: "Eloquent JavaScript",                 author: "Marijn Haverbeke",   category: "Programming",      year: 2018, copies: 3, isBorrowed: false, image: "https://eloquentjavascript.net/img/cover.jpg" },
    { id: 10, title: "The Alchemist",                       author: "Paulo Coelho",       category: "Fiction",          year: 1988, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg" },
    { id: 11, title: "Harry Potter",                        author: "J.K. Rowling",       category: "Fiction",          year: 1997, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/51UoqRAxwEL.jpg" },
    { id: 12, title: "The Power of Habit",                  author: "Charles Duhigg",     category: "Self Development", year: 2012, copies: 3, isBorrowed: false, image: "https://media.shortform.com/covers/png/the-power-of-habit-cover.png" },
    { id: 13, title: "Start with Why",                      author: "Simon Sinek",        category: "Business",         year: 2009, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/71NBZIExBCL._AC_UF1000,1000_QL80_.jpg" },
    { id: 14, title: "Zero to One",                         author: "Peter Thiel",        category: "Business",         year: 2014, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/51zGCdRQXOL._AC_UF1000,1000_QL80_.jpg" },
    { id: 15, title: "Introduction to Algorithms",          author: "Thomas H. Cormen",   category: "Programming",      year: 2009, copies: 3, isBorrowed: false, image: "https://m.media-amazon.com/images/I/61ZYxrQEpCL._AC_UF1000,1000_QL80_.jpg" },
    { id: 16, title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", category: "Self Development", year: 1989, copies: 3, isBorrowed: false, image: "https://diwanegypt.com/wp-content/uploads/2020/12/9781471195204.jpg" }
];

// Seed once — only if localStorage has nothing yet
(function seedBooks() {
    const raw = localStorage.getItem(BOOKS_STORAGE_KEY);
    if (!raw) {
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(initialBooks));
        return;
    }
    try {
        const data = JSON.parse(raw);
        if (!Array.isArray(data)) throw new Error();
    } catch {
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(initialBooks));
    }
})();

// ── CRUD helpers ─────────────────────────────────────────────
function getBooks() {
    try {
        return JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveBooks(books) {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
}

function getBookById(id) {
    return getBooks().find(b => b.id == id) || null;
}

// ── Auth helpers ──────────────────────────────────────────────
function getLoggedInUser() {
    const username = localStorage.getItem("loggedInUser");
    const role     = localStorage.getItem("loggedInRole");
    if (!username) return null;
    return { username, role };
}

function logout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInRole");
    window.location.href = "../index.html";
}

// ── Auth guards ───────────────────────────────────────────────
function requireLogin() {
    if (!getLoggedInUser()) {
        window.location.href = "../pages/login.html";
    }
}

function requireAdmin() {
    const user = getLoggedInUser();
    if (!user || user.role !== "admin") {
        window.location.href = "../pages/login.html";
    }
}