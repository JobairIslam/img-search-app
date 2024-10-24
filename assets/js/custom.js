const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const imageGrid = document.getElementById("imageGrid");
const showMoreButton = document.getElementById("showMoreButton");

// Unsplash API access key (replace with your key)
const accessKey = "KVVN-nzvvpTB9sictxr5N6_5OgpBE9jEwbEf50xg0Mc";

// Variables to track the current state
let page = 1; // Page number for pagination
let currentQuery = ""; // Store the current search query
const imagesPerPage = 35; // Number of images to load initially
const additionalImages = 15; // Number of images to load on 'Show More'

// Event listener for search button click
searchButton.addEventListener("click", () => {
  currentQuery = searchInput.value; // Store the user's query
  page = 1; // Reset page number when making a new search
  fetchImages(currentQuery, imagesPerPage); // Fetch images based on query
});

// Event listener for 'Show More' button click
showMoreButton.addEventListener("click", () => {
  page++; // Increment the page number for pagination
  fetchImages(currentQuery, additionalImages); // Load more images
});

// Fetch random images on page load (like Pinterest)
window.addEventListener("load", () => {
  fetchImages("", imagesPerPage); // Empty query for random images
});

// Function to fetch images from Unsplash API
async function fetchImages(query, count) {
  let url = `https://api.unsplash.com/photos?client_id=${accessKey}&page=${page}&per_page=${count}`;

  // If a query is provided, modify the URL to search for specific images
  if (query) {
    url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${query}&page=${page}&per_page=${count}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    // If it's a search, Unsplash wraps results inside a 'results' array
    const images = query ? data.results : data;

    // Display the fetched images
    displayImages(images);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Function to display images in the grid
function displayImages(images) {
  // Clear the grid if it's a new search
  if (page === 1) {
    imageGrid.innerHTML = ""; // Clear previous images
  }

  // Loop through each image and create an HTML element for it
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description;
    imgElement.classList.add("w-full", "h-auto", "rounded-lg");

    // Append the image to the grid
    imageGrid.appendChild(imgElement);
  });
}
