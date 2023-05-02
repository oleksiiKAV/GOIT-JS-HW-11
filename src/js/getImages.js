import { infoSys } from './helpers';
import { showImages } from './showImages';
// import storage from './storage.js';
// Change code below this line
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

const API_KEY = '35854962-95aa6da93a9a5ed946bcb6885'

let paginatorPage = 1

const loadMoreBtn = document.querySelector(".load-more");

loadMoreBtn.addEventListener("click", (event) => {
    // console.log("dddddddddddd")
    paginatorPage = paginatorPage + 1
    getImages()
});


document.querySelector("input").addEventListener("change", () => paginatorPage = 1)

export async function getImages() {
    const searchStr = document.querySelector("input").value.trim();

    let url = `https://pixabay.com/api/?key=35854962-95aa6da93a9a5ed946bcb6885&q=${searchStr}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${paginatorPage}`
    // console.log(url)
    const startTime = performance.now();

    try {

        const res = await axios.get(url);
        const endTime = performance.now();
        const data = res.data;

        if (data.length === 0) {
            infoSys("warn", "Sorry, there are no images matching your search query. Please try again.")
        }
        else {
            const totalPages = Math.ceil(data.totalHits / 40)
            // debugger
            if (data.length !== 0 && paginatorPage === 1) {
                infoSys("info", `Hooray! We found ${data.totalHits} images in ${((endTime - startTime) / 1000).toFixed(3)} seconds.`)
                console.log(`Hooray! We found ${data.totalHits} images in ${((endTime - startTime) / 1000).toFixed(3)} seconds.`)
            }
            if (data.totalHits > 40) {
                loadMoreBtn.classList.remove('is-hidden')
            }
            if (data.totalHits > 40 && paginatorPage === totalPages) {
                loadMoreBtn.classList.add('is-hidden')
                infoSys("warn", "We're sorry, but you've reached the end of search results.")
            }
            showImages(data)
        }
    }
    catch (err) {
        if (err.response) {
            // ✅ log status code here
            console.log(err.response.status);
            console.log(err.message);
            console.log(err.response.headers); // 👉️ {... response headers here}
            console.log(err.response.data); // 👉️ {... response data here}
        }
    }
}
