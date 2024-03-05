const API_KEY = "adc505f69f25444ab924310f5b52ac38";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));
function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY} `);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardContainer = document.getElementById("cards-container");
  const cardTemplate = document.getElementById("template-news-card");
  cardContainer.innerHTML = " ";

  articles.forEach((articles) => {
    if (!articles.urlToImage) return;

    const cardClone = cardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, articles);
    cardContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, articles) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDecs = cardClone.querySelector("#news-decs");

  newsImg.src = articles.urlToImage;
  newsTitle.innerHTML = articles.title;
  newsDecs.innerHTML = articles.description;

  const date = new Date(articles.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${articles.source.name} ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(articles.url, "_blank");
  });
}

let curSeletedNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSeletedNav?.classList.remove("active");
  curSeletedNav = navItem;
  curSeletedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;

  if (!query) return;

  fetchNews(query);

  curSeletedNav?.classList.remove("active");
  curSeletedNav = navItem;
});
