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
            (availability === "Available" && !book.isBorrowed && book.copies > 0) ||
            (availability === "Borrowed" && book.isBorrowed);

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

        let statusText = "";
        let statusClass = "";
        let borrowButton = "";

        if (book.isBorrowed) {
            statusText = "Borrowed";
            statusClass = "borrowed";
            borrowButton = `<button class="unborrow-btn" onclick="unborrowBookInSearch(${book.id})">Unborrow</button>`;
        } else if (book.copies === 0) {
            statusText = "Out of Stock";
            statusClass = "out-of-stock";
            borrowButton = `<button disabled>Unavailable</button>`;
        } else {
            statusText = "Available";
            statusClass = "available";
            borrowButton = `<button class="borrow-btn" onclick="borrowBookInSearch(${book.id})">Borrow</button>`;
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

        resultsContainer.innerHTML += card;
    });
}
function borrowBookInSearch(id) {
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
            document.querySelector(".search-form").dispatchEvent(new Event("submit", { cancelable: true }));
        }
    }

}

function unborrowBookInSearch(id) {
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
        document.querySelector(".search-form").dispatchEvent(new Event("submit", { cancelable: true }));
    }
}
