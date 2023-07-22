var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var closeBtn = document.getElementById("closeBtn");
var warningBox = document.querySelector(".warning-box");
var bookmarks = [];
var deleteBtns;
var visitBtns;
if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  displayBookmarks(bookmarks);

}


// validating inputs while typing

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex =   /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

siteName.addEventListener("input", function () {
  validateInput(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validateInput(siteURL, urlRegex);
});

function validateInput(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}



//func to display bookmarks

function displayBookmarks(bookmarks) {
  for (var i = 0; i < bookmarks.length; i++) {
    var newBookmark = `
              <tr>
                <td>${i + 1}</td>
                <td class="text-capitalize">${bookmarks[i].siteName}</td>              
                <td>
                  <button class="btn btn-visit" data-index="${i}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" data-index="${i}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
    tableContent.innerHTML += newBookmark;


    deleteBtns = document.querySelectorAll(".btn-delete");
    if (deleteBtns) {
      for (var j = 0; j < deleteBtns.length; j++) {
        deleteBtns[j].addEventListener("click", function (e) {
          deleteBookmark(e);
        });
      }
    }
  }


  visitBtns = document.querySelectorAll(".btn-visit");
  if (visitBtns) {
    for (var k = 0; k < visitBtns.length; k++) {
      visitBtns[k].addEventListener("click", function (e) {
        visitWebsite(e);
      });
    }
  }
}


// clear input fields after submit

function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}


//submiting inputs

submitBtn.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: siteName.value,
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    tableContent.innerHTML = "";
    displayBookmarks(bookmarks);
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    warningBox.classList.remove("d-none");
  }
});

//delete bookmark

function deleteBookmark(e) {
  tableContent.innerHTML = "";
  var deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  displayBookmarks(bookmarks);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

//visig website

function visitWebsite(e) {
  var siteIndex = e.target.dataset.index;
  window.open(`${bookmarks[siteIndex].siteURL}`, "_blank");
}

//close warning box 


function closePopup() {
  warningBox.classList.add("d-none");
}


closeBtn.addEventListener("click", closePopup);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closePopup();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("warning-box")) {
    closePopup();
  }
});
