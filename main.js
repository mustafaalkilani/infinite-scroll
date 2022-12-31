// Get Elements from html
const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let ready = false;
let LoadedImage = 0;
let totalImages = 0;

// create a publick array to hold the response
let dataArray = [];

// Setting up unsplash url 
const apiKey = 'pXJieOWjvRybxbGgCKOsRodCWcTX_c1oXJXSAQu3y2w';
let count = 5;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    LoadedImage++;
    console.log('load');
    if (LoadedImage === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// create a helper function to set attribute
function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }  

// create a function to display the photos 
function displayPhotos() {
    LoadedImage = 0;
    totalImages = dataArray.length;
    // Run function for each photo in the Array
    dataArray.forEach((photo) => {
        // Create <a> to link to full photo
        const item = document.createElement('a');
        setAttributes(item, {
          href: photo.links.html,
          target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
          src: photo.urls.regular,
          alt: photo.alt_description,
          title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Creating the call to api
async function getRandomPhoto() {
    try {
        const response = await fetch(apiUrl);
        dataArray = await response.json();
        displayPhotos();
        } catch(error) {
        // catch errors here
    }
}

// Check to see if sscrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getRandomPhoto();
    }
});

// Start the functions
getRandomPhoto();