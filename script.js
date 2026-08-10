const grid = document.querySelector(".grid");
const input = document.querySelector(".search");
const search_btn = document.querySelector(".searchbtn");
const categories = document.querySelectorAll(".categories");

// function to fetch images

async function getImages(query) {
  const keys = import.meta.env.UNPLASH_API;
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${keys}`;

  try {
    const res = await fetch(url); // wait sometimes
    const data = await res.json(); // comes data

    // show images in grid
    grid.innerHTML = "";

    data.results.forEach((img) => {
      const div = document.createElement("div");
      div.classList.add("image-btn");

      div.innerHTML = `
        <img src="${img.urls.regular}"/>
        <button class="download-image">
        <span class="material-symbols-outlined"> download
</span>
        </button>
      `
      grid.appendChild(div);
    });
    ``;
  } catch (err) {
    console.log(err);
  }
}

// search button click
search_btn.addEventListener("click", () => {
  getImages(input.value);
});

// enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getImages(input.value);
  }
});

// categories btns

categories.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.textContent === "Nature") {
      getImages("Nature");
    }
    if (e.target.textContent === "Cars") {
      getImages("Cars");
    }
    if (e.target.textContent === "Tech") {
      getImages("Tech");
    }
    if (e.target.textContent === "Gaming") {
      getImages("Gaming");
    }
    if (e.target.textContent === "Wallpapers") {
      getImages("Wallpapers");
    }
    if (e.target.textContent === "Film") {
      getImages("Film");
    }
    if (e.target.textContent === "Architecture") {
      getImages("Architecture");
    }
    if (e.target.textContent === "Texture") {
      getImages("Texture");
    }
    if (e.target.textContent === "Animals") {
      getImages("Animals");
    }
  });
});

const wallpapers = [
  "Nature",
  "Mountains",
  "Forest",
  "Ocean",
  "Sunset",
  "Sunrise",
  "Sky",
  "Clouds",
  "River",
  "Waterfall",

  "Cars",
  "SportsCar",
  "Supercar",
  "Bike",
  "Racing",
  "Luxury",
  "Classic",
  "Drift",
  "Speed",
  "Engine",

  "Technology",
  "AI",
  "Coding",
  "Cyber",
  "Digital",
  "Futuristic",
  "Robotics",
  "Neon",
  "Circuit",
  "Data",

  "Gaming",
  "Playstation",
  "Xbox",
  "PC",
  "Esports",
  "Battle",
  "Warzone",
  "FPS",
  "Adventure",
  "Fantasy",

  "Anime",
  "Naruto",
  "DragonBall",
  "OnePiece",
  "AttackOnTitan",
  "TokyoGhoul",
  "DemonSlayer",
  "Jujutsu",
  "Manga",
  "Otaku",

  "Dark",
  "Minimal",
  "Abstract",
  "Gradient",
  "Aesthetic",
  "Black",
  "White",
  "Colorful",
  "Pastel",
  "Neon",

  ,
  "Street",
  "Urban",
  "Lights",
  "Traffic",
  "Architecture",
  "Bridge",
  "Downtown",

  "Space",
  "Galaxy",
  "Stars",
  "Planet",
  "Moon",
  "Universe",
  "Astronomy",
  "Cosmos",
  "MilkyWay",
  "Nebula",
];

// download button fuctionality

grid.addEventListener("click", (e) => {

  let target = e.target;

  if (target.tagName === "SPAN") {
    target = target.parentElement;
  }

  if (target.classList.contains("download-image")) {
    const img = target.parentElement.querySelector("img");
    downloadImage(img.src);
  }
});

function downloadImage(url) {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {

      const a = document.createElement("a");

      const objectUrl = URL.createObjectURL(blob);

      a.href = objectUrl;

      a.download = "unsplash-image.jpg";

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(objectUrl);
    });
}

// get the random number
function randomnumber() {
  return Math.floor(Math.random() * wallpapers.length);
}

// show the random images while our screen is render
getImages(wallpapers[randomnumber()]);
