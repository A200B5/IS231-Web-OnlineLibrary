const BOOKS_STORAGE_KEY = "books";
const currentYear = new Date().getFullYear();

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

function getData() {
    let storedData = localStorage.getItem(BOOKS_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
}

function goToDetails(id) {
    window.location.href = `admin_book_details.html?id=${id}`;
}





if (document.getElementById('BookDetails')) {
    document.getElementById('BookDetails').addEventListener("submit", function (e) {
        e.preventDefault();

        let formData = new FormData(this);
        let book = Object.fromEntries(formData);
        book.id = Date.now();
        book.available = true;
        book.isBorrowed = false;
        console.log(book);

        let errors = [];

        if (Number(book.year) > currentYear) {
            errors.push('Enter valid Year of Publish');
        }

        if (Number(book.copies) < 1) {
            errors.push('Available copies should be greater than or equal to 1');
        }

        if (errors.length > 0) {
            for (let i = 0; i < errors.length; i++) {
                alert(errors[i]);
            }
            return;
        }

        let books = getData();

        books.push(book);
        console.log(books);
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));

        goToDetails(book.id);

    });
}




if (document.getElementById('EditBookDetails')) {
    document.addEventListener('DOMContentLoaded', function () {
        let x = new URLSearchParams(window.location.search);
        let id = x.get("id");

        let books = getData();
        let book = books.find(book => book.id === Number(id));

        if (!book) {
            alert('Book not found!');
            return;
        }

        document.getElementById('title').value = book.title;
        document.getElementById('year').value = book.year;
        document.getElementById('description').value = book.description;
        document.getElementById('author').value = book.author;
        document.getElementById('category').value = book.category;
        document.getElementById('image').value = book.image;
        document.getElementById('copies').value = book.copies;
        console.log(document.getElementById('title').value);
        console.log(document.getElementById('year').value);
        console.log(document.getElementById('description').value);
        console.log(document.getElementById('author').value);
        console.log(document.getElementById('category').value);
        console.log(document.getElementById('image').value);
        console.log(document.getElementById('copies').value);


        document.getElementById('EditBookDetails').addEventListener("submit", function (e) {
            e.preventDefault();

            let formData = new FormData(this);
            let newBook = Object.fromEntries(formData);

            let errors = [];

            if (Number(newBook.year) > currentYear) {
                errors.push('Enter valid Year of Publish');
            }

            if (Number(newBook.copies) < 1) {
                errors.push('Available copies should be greater than or equal to 1');
            }

            if (errors.length > 0) {
                for (let i = 0; i < errors.length; i++) {
                    alert(errors[i]);
                }
                return;
            }

            book.title = newBook.title;
            book.year = newBook.year;
            book.description = newBook.description;
            book.author = newBook.author;
            book.category = newBook.category;
            book.image = newBook.image;
            book.copies = newBook.copies;
            const index = books.findIndex(b => b.id === book.id);
            if (index !== -1) {
                books[index] = book;
            }

            localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));

            goToDetails(book.id);

        });
    });
}
