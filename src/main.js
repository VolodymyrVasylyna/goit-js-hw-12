import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

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
  const inputValue = e.target.elements.input.value;
  searchParams.q = inputValue;
  searchParams.page = 1;
  gallery.innerHTML = '';
  try {
    const images = await getPhotoByName();
    appendToGallery(images);
  } catch (error) {
    console.log(error);
  }
  e.target.reset();
});

async function getPhotoByName() {
  const url = 'https://pixabay.com/api/';
  try {
    showLoadingMessage();
    const response = await axios.get(url, { params: searchParams });
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  } finally {
    hideLoadingMessage();
  }
}

function appendToGallery(images) {
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
    gallery.innerHTML += link;
    loadMoreBtn.style.display = 'block';
  }
  let lightBox = new SimpleLightbox('.gallery-link');
  lightBox.refresh();
}

function showLoadingMessage() {
  loader.style.display = 'flex';
}

function hideLoadingMessage() {
  loader.style.display = 'none';
}

loadMoreBtn.addEventListener('click', async function () {
  searchParams.page++;
  try {
    const images = await getPhotoByName();
    appendToGallery(images);
    smoothScrollToNextGallery();
    if (images.totalHits <= searchParams.page * searchParams.per_page) {
      loadMoreBtn.style.display = 'none';
      iziToast.show({
        message:
          'We\'re sorry, but you\'ve reached the end of search results.',
        messageColor: '#FFFFFF',
        backgroundColor: 'rgba(108, 140, 255, 0.7)',
        position: 'topRight',
        messageSize: '16px',
        messageLineHeight: '24px',
        maxWidth: '432px',
      });
    }
  } catch (error) {
    console.error(error);
  }
});

function smoothScrollToNextGallery() {
  const galleryItemHeight = document.querySelector('.gallery-link').getBoundingClientRect().height;
  window.scrollBy({
    top: galleryItemHeight * 3,
    behavior: 'smooth'
  });
}