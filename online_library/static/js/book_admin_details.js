let x = new URLSearchParams(window.location.search);
let id = x.get("id");

const books = JSON.parse(localStorage.getItem("books")) || [];

const book = books.find(b => b.id == id);

if (!book) {
    document.querySelector("main").innerHTML = "<p>Book not found. <a href='admin_books.html'>Go back</a></p>";
    // stop the rest of the script
    throw new Error("Book not found");
}

document.querySelector(".book-details-card__title").textContent = book.title;
document.querySelector(".book-author").innerHTML = `<strong>Author:</strong> ${book.author}`;
document.querySelector(".book-category").innerHTML = `<strong>Category:</strong> ${book.category}`;
document.querySelector(".book-year").innerHTML = `<strong>Published Year:</strong> ${book.year}`;
document.querySelector(".book-copies").innerHTML = `<strong>Available Copies:</strong> ${book.copies}`;

const img = document.querySelector(".book-image");
img.src = book.image;
img.alt = book.title;

const status = document.querySelector(".status-badge");

if (book.copies > 0) {
    status.textContent = "Available";
    status.classList.add("status-badge--available");
} else {
    status.textContent = "Out of Stock";
    status.classList.add("status-badge--out");
}


function goToEdit(id) {
    window.location.href = `admin_edit_book.html?id=${id}`;
}

let edt = document.querySelector(".edit");
edt.onclick = function () {
    goToEdit(id);
};

function deleteBook(id) {
    const books = JSON.parse(localStorage.getItem("books"));
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
            books.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("books", JSON.stringify(books));
    window.location.href = "admin_books.html";
}


const deleteBtn = document.querySelector(".delete-btn");
deleteBtn.onclick = function () {
    deleteBook(id);
};

