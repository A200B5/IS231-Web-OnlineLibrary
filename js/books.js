// Seed Books Data (used only if localStorage is empty or invalid)
const BOOKS_STORAGE_KEY = "books";

const initialBooks = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", category: "Programming", year: 2008, available: true, image: "https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg" },
  { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self Development", year: 2018, available: true, image: "https://m.media-amazon.com/images/I/51-nXsSRfZL.jpg" },
  { id: 3, title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming", year: 1999, available: true, image: "https://m.media-amazon.com/images/I/41as+WafrFL.jpg" },
  { id: 4, title: "Deep Work", author: "Cal Newport", category: "Productivity", year: 2016, available: true, image: "https://m.media-amazon.com/images/I/41n6H9qkG9L.jpg" },
  { id: 5, title: "Design Patterns", author: "Erich Gamma", category: "Programming", year: 1994, available: false, image: "https://m.media-amazon.com/images/I/51k+7H6VqAL.jpg" },
  { id: 6, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Finance", year: 1997, available: true, image: "https://m.media-amazon.com/images/I/51AHZGhzZEL.jpg" },
  { id: 7, title: "Think and Grow Rich", author: "Napoleon Hill", category: "Finance", year: 1937, available: true, image: "https://m.media-amazon.com/images/I/51o5rmY5HCL.jpg" },
  { id: 8, title: "You Don’t Know JS", author: "Kyle Simpson", category: "Programming", year: 2015, available: true, image: "https://m.media-amazon.com/images/I/41xShlnTZTL.jpg" },
  { id: 9, title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Programming", year: 2018, available: true, image: "https://m.media-amazon.com/images/I/41k3zG6kZOL.jpg" },
  { id: 10, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", year: 1988, available: true, image: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg" },
  { id: 11, title: "Harry Potter", author: "J.K. Rowling", category: "Fiction", year: 1997, available: false, image: "https://m.media-amazon.com/images/I/51UoqRAxwEL.jpg" },
  { id: 12, title: "The Power of Habit", author: "Charles Duhigg", category: "Self Development", year: 2012, available: true, image: "https://m.media-amazon.com/images/I/41v7W9dKQhL.jpg" },
  { id: 13, title: "Start with Why", author: "Simon Sinek", category: "Business", year: 2009, available: true, image: "https://m.media-amazon.com/images/I/41-7j8L+XGL.jpg" },
  { id: 14, title: "Zero to One", author: "Peter Thiel", category: "Business", year: 2014, available: true, image: "https://m.media-amazon.com/images/I/41-uPjEenkL.jpg" },
  { id: 15, title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Programming", year: 2009, available: true, image: "https://m.media-amazon.com/images/I/41SN1Zz6sCL.jpg" }
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

// Initialize localStorage (only if missing OR invalid)
if (!safeLoadBooks()) {
  localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(initialBooks));
}

function getBooks() {
  const raw = localStorage.getItem(BOOKS_STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function getBookById(id) {
  const books = getBooks();
  return books.find(book => book.id === id);
}

function saveBooks(books) {
  localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
}

