var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var tableBody = document.getElementById("tableBody");
var urlAlert = document.getElementById("urlAlert");
var nameAlert = document.getElementById("nameAlert");
var sites = JSON.parse(localStorage.getItem("allSites")) || [];
displaySites(sites);

function AddSite() {
  validateURL();
  validateName();
  var site = getSiteData(bookmarkName.value, bookmarkURL.value);
  if (isValidUrl(bookmarkURL.value) && isValidName(bookmarkName.value)) {
    sites.push(site);
    localStorage.setItem("allSites", JSON.stringify(sites));
    displaySites(sites);
    clearInputs();
  } else {
    validateURL();
    validateName();
  }
}

function deleteSite(index) {
  sites.splice(index, 1);
  localStorage.setItem("allSites", JSON.stringify(sites));
  displaySites(sites);
}

function clearInputs() {
  bookmarkName.value = "";
  bookmarkURL.value = "";
}

function displaySites(sitesArray) {
  var tableRows = "";
  for (var i = 0; i < sitesArray.length; i++) {
    tableRows += `
    <tr>
    <td>${i + 1}</td>
    <td>${sitesArray[i].name}</td>
    <td>
      <a href="${sitesArray[i].url}" target="_blank" class="btn btn-visit">
        <i class="fa-solid fa-eye pe-2"></i>Visit
      </a>
    </td>
    <td>
      <button class="btn btn-delete" onclick="deleteSite(${i})">
        <i class="fa-solid fa-trash-can pe-2"></i>Delete
      </button>
    </td>
  </tr>
    `;
  }
  tableBody.innerHTML = tableRows;
}

function isValidUrl(string) {
  var url;
  try {
    url = new URL(string);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch (_) {
    return false;
  }
}

function isValidName(string) {
  return string !== "";
}

function getSiteData(name, url) {
  return { name: name, url: url };
}

function validateURL() {
  if (isValidUrl(bookmarkURL.value)) {
    if (!urlAlert.classList.contains("d-none"))
      urlAlert.classList.add("d-none");
    bookmarkURL.classList.add("is-valid");
    bookmarkURL.classList.remove("is-invalid");
  } else {
    urlAlert.classList.remove("d-none");
    bookmarkURL.classList.remove("is-valid");
    bookmarkURL.classList.add("is-invalid");
  }
}

function validateName() {
  if (isValidName(bookmarkName.value)) {
    if (!nameAlert.classList.contains("d-none"))
      nameAlert.classList.add("d-none");
    bookmarkName.classList.remove("is-invalid");
    bookmarkName.classList.add("is-valid");
  } else {
    nameAlert.classList.remove("d-none");
    bookmarkName.classList.add("is-invalid");
    bookmarkName.classList.remove("is-valid");
  }
}
