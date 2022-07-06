/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

//Variable to cap the total amount of students per page + readability 
const studentPerPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) => {

   // create two variables which will represent the index for the first and last student on the page
   const startIndex = (page * studentPerPage) - studentPerPage;
   const endIndex = (page * studentPerPage);

   // select the element with a class of `student-list` and assign it to a variable
   const studentList = document.querySelector('.student-list');

   // set the innerHTML property of the variable you just created to an empty string
   studentList.innerHTML = "";


   // loop over the length of the `list` parameter
   for (let i = 0; i < list.length; i++) {

      // inside the loop create a conditional to display the proper students
      if (i >= startIndex && i < endIndex) {

         // inside the conditional:
         // create the elements needed to display the student information
         let studentItem = `
         <li class="student-item cf">
         <div class="student-details">
          <img class="avatar" src= ${list[i].picture.large} alt="Profile Picture">
          <h3>${list[i].name.first} ${list[i].name.last}</h3>
          <span class="email">${list[i].email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${list[i].registered.date}</span>
        </div>
      </li>
      `;

         // insert the above elements
         studentList.insertAdjacentHTML("beforeend", studentItem);

      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = (list) => {
   // create a variable to calculate the number of pages needed
   const numOfPages = Math.ceil(list.length / studentPerPage);

   // select the element with a class of `link-list` and assign it to a variable
   const linkList = document.querySelector(".link-list");

   // set the innerHTML property of the variable you just created to an empty string
   linkList.innerHTML = "";

   // loop over the number of pages needed
   for (let i = 1; i <= numOfPages; i++) {

      // create the elements needed to display the pagination button
      let paginationButton = `
      <li>
         <button type="button">${i}</button>
      </li>
    `;

      // insert the above elements
      linkList.insertAdjacentHTML("beforeend", paginationButton);


      // give the first pagination button a class of "active"
      const activeButton = document.querySelector("button");
      activeButton.className = "active";

      // create an event listener on the `link-list` element
      linkList.addEventListener("click", (e) => {

         // if the click target is a button:
         // remove the "active" class from the previous button
         if (e.target.tagName === "BUTTON") {
            let activeButton = document.querySelector(".active");
            activeButton.className = "";

            // add the active class to the clicked button
            e.target.className = "active";

            // call the showPage function passing the `list` parameter and page to display as arguments
            showPage(list, e.target.textContent);
         }
      });

   }
}

// Call functions
showPage(data, 1);
addPagination(data);

/*
Exceeds Expectation portion of the project:
 Create/Append a list of new students into the page with the searchStudent function into page that will take input from a user and match the letter 
*/

//1 Display Search Form
const searchForm = () => {
   const searchHeader = document.querySelector(".header");
   const searchLabel = document.createElement("label");
   searchLabel.innerHTML =
      `
      <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
      `;
   searchHeader.appendChild(searchLabel);
}
//calls function to display
searchForm();


//2 Search Functionality 

// 1. Take/store search input
const searchInput = document.getElementById("search");
let newStudentList = [];

//    a. See if individual student's data includes stored search input
searchInput.addEventListener("keyup", (e) => {
      const filterInput =  e.target.value;

       const filteredStudent = newStudentList.filter( student => {
         return student.name.includes(filterInput) // || student.name.includes(filterInput);

         });
   console.log(filteredStudent);
})


//    b. If individual student's data includes stored search input, add that student to new list of students
// 3. After loop ends, call showPage function with new list of students as first argument