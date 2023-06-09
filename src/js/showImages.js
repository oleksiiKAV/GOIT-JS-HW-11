import { parseInt } from 'lodash';
import storage from './storage.js';
const gallery = document.querySelector('.gallery');
// add h1
const h1 = document.createElement("h1");
h1.textContent = "GOIT-JS-11 Image gallery axios + SimpleLightbox";
// h1.style.visibility = "hidden";
gallery.before(h1);
h1.style.display = "none";
const loadMoreBtn = document.querySelector(".load-more");
export function showImages(data) {

  const listItems = [];

  data.hits.forEach(item => {
    // Создаем div элемент с классом photo-card
    const photoCard = document.createElement("div");
    photoCard.classList.add("photo-card");

    // Создаем a элемент с классом gallery__link и href атрибутом
    const link = document.createElement("a");
    link.classList.add("gallery__link");
    link.setAttribute("href", item.largeImageURL);

    // Создаем img элемент с loading="lazy" и добавляем его в a элемент
    const img = document.createElement("img");
    img.classList.add('gallery__image');
    img.setAttribute("src", item.webformatURL);
    // img.setAttribute("src", "../images/load.png"); // добавляем изображение-заглушку
    // img.setAttribute("data-src", item.webformatURL); // добавляем основное изображение

    img.setAttribute("alt", item.tags);
    img.setAttribute("loading", "lazy");

    link.appendChild(img);

    // Создаем div элемент с классом info и дочерними элементами p
    const info = document.createElement("div");
    info.classList.add("info");

    const likes = document.createElement("p");
    likes.classList.add("info-item");
    const likesText = document.createElement("b");
    likesText.textContent = "Likes: " + item.likes; // добавляем значение переменной
    likes.appendChild(likesText);

    const views = document.createElement("p");
    views.classList.add("info-item");
    const viewsText = document.createElement("b");
    viewsText.textContent = "Views: " + item.views; // добавляем значение переменной
    views.appendChild(viewsText);

    const comments = document.createElement("p");
    comments.classList.add("info-item");
    const commentsText = document.createElement("b");
    commentsText.textContent = "Comments: " + item.comments; // добавляем значение переменной
    comments.appendChild(commentsText);

    const downloads = document.createElement("p");
    downloads.classList.add("info-item");
    const downloadsText = document.createElement("b");
    downloadsText.textContent = "Downloads: " + item.downloads; // добавляем значение переменной
    downloads.appendChild(downloadsText);

    info.appendChild(likes);
    info.appendChild(views);
    info.appendChild(comments);
    info.appendChild(downloads);

    // Добавляем все элементы в photoCard
    link.appendChild(img);
    photoCard.appendChild(link);
    photoCard.appendChild(info);

    listItems.push(photoCard);
    // gallery.appendChild(li);

  });
  gallery.append(...listItems);

  let galleryBox = new SimpleLightbox('.gallery a');
  galleryBox.options.overlay = true;
  const CURRENT_IMG = 'currentImageIndex'
  galleryBox.on('changed.simplelightbox', () => {
    // console.log(galleryBox.currentImageIndex);
    storage.save(CURRENT_IMG, galleryBox.currentImageIndex)
  })
}

export { onScroll, onToTopBtn }

const toTopBtn = document.querySelector('.btn-to-top')

//************  use "ton" - 67 imgs ***************************** */
// Получаем кнопку "Вниз"
const toDwnBtn = document.querySelector('.btn-to-dwn');

// Добавляем обработчик события на нажатие кнопки "Вниз"
toDwnBtn.addEventListener('click', () => {
  // Определяем высоту окна браузера и высоту документа
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  // Прокручиваем страницу до нижней части контента с плавной анимацией
  window.scrollTo({
    top: documentHeight - windowHeight,
    behavior: 'smooth'
  });
});

function checkScroll() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  const scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

  if (documentHeight > windowHeight) {
    // Если страница нуждается в скролле, показываем кнопку "Вниз"
    toDwnBtn.classList.add('btn-to-top--visible')
  } else {
    // Иначе скрываем кнопку "Вниз"
    toDwnBtn.classList.remove('btn-to-top--visible')
  }
}
// Добавляем обработчики событий на загрузку страницы и прокрутку страницы
window.addEventListener('load', checkScroll);

window.addEventListener('scroll', onScroll)
toTopBtn.addEventListener('click', onToTopBtn)
// window.addEventListener('click', onPauseScroll)

let coords = 0;
let isScrollingEnabled = true;
let shouldResumeScroll = true;

// if (isScrollingEnabled && shouldResumeScroll) {
// if (isScrollingEnabled) {
// window.addEventListener('scroll', stopScrolling)
// }
function onScroll() {
  const scrolled = window.pageYOffset

  if (document.querySelector(".photo-card")) {
    coords = parseInt(document.querySelector(".photo-card").clientHeight)
  }
  if (scrolled > coords) {
    toTopBtn.classList.add('btn-to-top--visible')
  }
  if (scrolled < coords) {
    toTopBtn.classList.remove('btn-to-top--visible')
  }

  if ((window.innerHeight + window.scrollY) > document.body.offsetHeight) {

    // Если страница нуждается в скролле, показываем кнопку "Вниз"
    toDwnBtn.classList.remove('btn-to-top--visible')
  } else {
    // Иначе скрываем кнопку "Вниз"
    toDwnBtn.classList.add('btn-to-top--visible')
  }
}

function onToTopBtn() {
  // if (event.targetclassList.contains('btn-to-top--visible')) {
  // debugger
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    toTopBtn.classList.remove('btn-to-top--clicked');
  }
}
