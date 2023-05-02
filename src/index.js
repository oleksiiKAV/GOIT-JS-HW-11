import { getImages } from './js/getImages.js'
import { onScroll, onToTopBtn } from './js/showImages'
import { infoSys } from './js/helpers.js';

const form = document.querySelector(".search-form");
const imgList = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

console.dir(form)
console.log("READY TO START")

onScroll()
onToTopBtn()

form.addEventListener("submit", (event) => {
    const searchStr = document.querySelector("input");
    event.preventDefault();
    // const { accept, username } = event.target.elements;
    imgList.innerHTML = ""
    console.log("searchStr.value = ", searchStr.value)
    loadMoreBtn.classList.add('is-hidden')
    // imgList.innerHTML = "<div class='gallery'></div>"
    if (searchStr.value !== "") {
        getImages()

    }
    else {
        infoSys("warn", "Please type a search query!")
        imgList.innerHTML = ""
    }


});


// const { height: cardHeight } = document
//     .querySelector(".gallery")
//     .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//     top: cardHeight * 2,
//     behavior: "smooth",
// });
// console.log("============= scroll ===============")




