/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering - V2
*/


/* This is a function to display a "page" of nine students. */

function showPage(list, page) {
    const itemsPerPage = 9;
    let startIndex = (page * itemsPerPage) - itemsPerPage;
    let endIndex = page * itemsPerPage;
    const studentList = document.querySelector(".student-list");

    let html = '';

    for (let i = startIndex; i < endIndex; i++) {
        let student = list[i];

        html += `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${student.picture.large}" alt="Profile Picture of ${student.name.first} ${student.name.last}">
            <h3>${student.name.first} ${student.name.last}</h3>
            <span class="email">${student.email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${student.registered.date}</span>
          </div>
        </li>
        `;
    }

    studentList.innerHTML = html;
}


/* This is a function to add pagination with active button styling */

function addPagination(list) {
    const itemsPerPage = 9;
    const numberOfPages = Math.ceil(list.length / itemsPerPage);
    const paginationList = document.querySelector(".pagination");

    let paginationHtml = '';

    for (let i = 1; i <= numberOfPages; i++) {
        paginationHtml += `<button>${i}</button>`;
    }

    paginationList.innerHTML = paginationHtml;

    function handlePaginationClick(e) {
        const buttonClicked = e.target.closest("button");

        if (buttonClicked) {
            const activeButton = paginationList.querySelector(".active");
            if (activeButton) {
                activeButton.classList.remove("active");
            }
            buttonClicked.classList.add("active");
            showPage(list, parseInt(buttonClicked.textContent));
        }
    }

    paginationList.removeEventListener("click", handlePaginationClick);
    paginationList.addEventListener("click", handlePaginationClick);
}


/* This is a function to create and add the search bar and button dynamically */

function addSearchBar() {
    const header = document.querySelector(".header");
    const searchContainer = document.createElement("div");
    searchContainer.className = "student-search";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "student-search-input";
    searchInput.placeholder = "Search for students...";

    const searchButton = document.createElement("button");
    searchButton.className = "student-search-button";

    const buttonImage = document.createElement("img");
    buttonImage.src = "img/icn-search.svg";
    buttonImage.alt = "Search";

    searchButton.appendChild(buttonImage);
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);
    header.appendChild(searchContainer);

    handleSearch();
}


/* This is a function to handle search functionality */

function handleSearch() {
    const searchInput = document.querySelector(".student-search-input");
    const listContainer = document.querySelector(".student-list");
    const paginationList = document.querySelector(".pagination");

    function performSearch() {
        const newData = [];
        const userInput = searchInput.value.toLowerCase();

        for (let i = 0; i < data.length; i++) {
            const studentName = `${data[i].name.first.toLowerCase()} ${data[i].name.last.toLowerCase()}`;

            if (studentName.includes(userInput)) {
                newData.push(data[i]);
            }
        }

        if (newData.length > 0) {
            showPage(newData, 1);
            addPagination(newData);
        } else {
            const html = `
                <div class="no-results">
                    <h3>Oops. No result found.</h3>
                    <img src="img/not found.png" alt="No Results Image" />
                </div>
            `;
            listContainer.innerHTML = html;
            paginationList.innerHTML = "";
        }
    }

    searchInput.addEventListener("input", performSearch);
}


addSearchBar();
showPage(data, 1);
addPagination(data);
