import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.getElementById('load-more');

const searchParams = {
  key: '42334155-d8ef6d202703fa7fdc7903459',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  q: '',
  page: 1,
  per_page: 15,
};

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  loader.style.display = 'block';
  const inputValue = e.target.elements.input.value;
  searchParams.q = inputValue;
  searchParams.page = 1;
  try {
    const images = await getPhotoByName();
    createGallery(images);
  } catch (error) {
    console.log(error);
  }
  e.target.reset();
});

loadMoreBtn.addEventListener('click', async function () {
  loader.style.display = 'block';
  searchParams.page++;
  try {
    const images = await getPhotoByName();
    appendToGallery(images);
  } catch (error) {
    console.log(error);
  }
});

async function getPhotoByName() {
  const url = 'https://pixabay.com/api/';
  try {
    const response = await axios.get(url, { params: searchParams });
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
}

function createGallery(images) {
  if (images.hits.length === 0) {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: '#FFFFFF',
      backgroundColor: '#EF4040',
      position: 'topRight',
      messageSize: '16px',
      messageLineHeight: '24px',
      maxWidth: '432px',
    });
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
  } else {
    const link = images.hits
      .map(
        image => `<a class="gallery-link" href="${image.largeImageURL}">
        <img class="gallery-image"
        src="${image.webformatURL}"
        alt="${image.tags}"
         </a>
         <div class="image-info">
          <p ><strong>Likes:</strong> <span class="text">${image.likes}</span></p>
          <p ><strong>Views:</strong> <span class="text">${image.views}</span></p>
          <p ><strong>Comments:</strong> <span class="text">${image.comments}</span></p>
          <p ><strong>Downloads:</strong> <span class="text">${image.downloads}</span></p>
          </div>
          
        `
      )
      .join('');
    gallery.innerHTML = link;
    loadMoreBtn.style.display = 'block';
  }
  let lightBox = new SimpleLightbox('.gallery-link');
  lightBox.refresh();
  loader.style.display = 'none';
}

function appendToGallery(images) {
  const link = images.hits
    .map(
      image => `<a class="gallery-link" href="${image.largeImageURL}">
        <img class="gallery-image"
        src="${image.webformatURL}"
        alt="${image.tags}"
         </a>
         <div class="image-info">
          <p ><strong>Likes:</strong> <span class="text">${image.likes}</span></p>
          <p ><strong>Views:</strong> <span class="text">${image.views}</span></p>
          <p ><strong>Comments:</strong> <span class="text">${image.comments}</span></p>
          <p ><strong>Downloads:</strong> <span class="text">${image.downloads}</span></p>
          </div>
          
        `
    )
    .join('');
  gallery.innerHTML += link;
  let lightBox = new SimpleLightbox('.gallery-link');
  lightBox.refresh();
  loader.style.display = 'none';
}

function showLoadingMessage() {
  const loadingMessage = document.createElement('div');
  loadingMessage.textContent = 'Loading images, please wait...';
  loadingMessage.classList.add('loading-message');
  document.body.appendChild(loadingMessage);
}

function hideLoadingMessage() {
  const loadingMessage = document.querySelector('.loading-message');
  if (loadingMessage) {
    loadingMessage.remove();
  }
}

loadMoreBtn.addEventListener('click', async function () {
  loader.style.display = 'block';
  searchParams.page++;
  try {
    const images = await getPhotoByName();
    if (images.totalHits <= searchParams.page * searchParams.per_page) {
      loadMoreBtn.style.display = 'none';
      showEndOfSearchMessage();
    } else {
      appendToGallery(images);
      smoothScrollToNextGallery();
    }
  } catch (error) {
    console.log(error);
  }
});

function showEndOfSearchMessage() {
  const endOfSearchMessage = document.createElement('div');
  endOfSearchMessage.textContent = "We're sorry, but you've reached the end of search results.";
  endOfSearchMessage.classList.add('end-of-search-message');
  document.body.appendChild(endOfSearchMessage);
}

function smoothScrollToNextGallery() {
  const galleryItemHeight = document.querySelector('.gallery-link').getBoundingClientRect().height;
  window.scrollBy({
    top: galleryItemHeight * 3,
    behavior: 'smooth'
  });
}