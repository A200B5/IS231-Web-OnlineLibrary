const BOOKS_STORAGE_KEY = "books";

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
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify([]));
    }

function getData(){
    let storedData = localStorage.getItem(BOOKS_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
}
if(document.getElementById('BookDetails')){
document.getElementById('BookDetails').addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(this);
    let book=Object.fromEntries(formData);
    book.id=Date.now();
    book.available=true;
    console.log(book);

    let books = getData();

    books.push(book);
    console.log(books);
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));

    this.reset();
    alert(`The book is saved successfully`);
});
}
if(document.getElementById('EditBookDetails')){
document.addEventListener('DOMContentLoaded', function (e, id = 1) {
    
    let books = getData();
    let book = books.find(book => book.id === id);
    document.getElementById('title').value = book.title;
    document.getElementById('year').value = book.year;
    document.getElementById('description').value = book.description;
    document.getElementById('author').value = book.author;
    document.getElementById('category').value = book.category;
    document.getElementById('image').value = book.image;
    console.log(document.getElementById('title').value);
    console.log(document.getElementById('year').value);
    console.log(document.getElementById('description').value);
    console.log(document.getElementById('author').value);
    console.log(document.getElementById('category').value);
    console.log(document.getElementById('image').value);

    document.getElementById('EditBookDetails').addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(this);
    let newBook=Object.fromEntries(formData);
    
    book.title = newBook.title;
    book.year = newBook.year;
    book.description = newBook.description;
    book.author = newBook.author;
    book.category = newBook.category;
    book.image = newBook.image;
    
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));

    alert(`The book changes are saved successfully`);
});
});}