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

        const statusText = book.available ? "Available" : "Out of Stock";
        const statusClass = book.available ? "available" : "borrowed";
        const btnText = book.available ? "Borrow" : "Not Available";
        const btnClass = book.available ? "btn-success" : "btn-danger";
        

let borrowButton = book.available
    ? `<button class="borrow-btn" onclick="borrowBook(${book.id})">Borrow</button>`
    : `<button disabled>Unavailable</button>`;

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