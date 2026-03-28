const form = document.querySelector(".search-form");
const resultsContainer = document.getElementById("resultsContainer");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("book_title").value.toLowerCase();
    const author = document.getElementById("author_name").value.toLowerCase();
    const category = document.getElementById("category").value;
    const availability = document.getElementById("availability").value;

    let books = getBooks();

    // Filter
    let filtered = books.filter(book => {

        let matchTitle = book.title.toLowerCase().includes(title);
        let matchAuthor = book.author.toLowerCase().includes(author);

        let matchCategory = (category === "Any" || book.category === category);

        let matchAvailability =
            availability === "Any" ||
            (availability === "Available" && book.available) ||
            (availability === "Borrowed" && !book.available);

        return matchTitle && matchAuthor && matchCategory && matchAvailability;
    });

    displayBooks(filtered);
});

function displayBooks(books) {
    resultsContainer.innerHTML = "";

    if (books.length === 0) {
        resultsContainer.innerHTML = "<h3>No books found.</h3>";
        return;
    }

    books.forEach(book => {

        const statusClass = book.available ? "available" : "borrowed";
        const statusText = book.available ? "Available" : "Borrowed";
        const btnText = book.available ? "Borrow" : "Not Available";
        const btnClass = book.available ? "btn-success" : "btn-danger";

        const card = `
            <div class="book-card">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Category: ${book.category}</p>
                <p class="book-status ${statusClass}">${statusText}</p>
                ${book.available ? `<button class="btn ${btnClass}" onclick="borrowBook(${book.id})">Borrow</button>` : `<button class="btn ${btnClass}" disabled>Not Available</button>`}
            </div>
        `;

        resultsContainer.innerHTML += card;
    });
}
function borrowBook(id) {
    const books = getBooks();

    const book = books.find(b => b.id === id);

    if (book && book.available) {
        book.available = false;
        saveBooks(books);

        document.querySelector(".search-form").dispatchEvent(new Event("submit"));
    }
}