const loadAllPostCategory = async (category, isShowAll) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  loadingSpinner.style.display = "block";
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
  );
  const data = await res.json();

  const posts = data.posts;
  if (!posts.length) {
    document.getElementById("not_found").style.display = "block";
    loadingSpinner.style.display = "none";
  }
  if (posts.length > 0) {
    loadingSpinner.style.display = "none";
    document.getElementById("not_found").style.display = "none";
  }
  displayPost(posts, isShowAll);
};

const displayPost = (posts) => {
  const cardContainer = document.getElementById("dynamic-card-container");
  cardContainer.textContent = "";
  posts.forEach((post) => {
    const card = document.createElement("div");
    card.classList = `bg-[#797DFC26] p-6 rounded-2xl min-w-fit mt-6 flex gap-16`;

    let bgColor = "";
    if (post.isActive) {
      bgColor = `<span class="indicator-item badge bg-green-500"></span>`;
    } else {
      bgColor = `<span class="indicator-item badge badge-secondary"></span>`;
    }

    card.innerHTML = `
            <div class="indicator">
           ${bgColor}
            <div class="bg-base-300 grid h-32 w-32 place-items-center"><img src="${post.image}" alt=""/></div>
           </div>
            <div class="space-y-4 ">
              <p># ${post.category} <span>  Author: ${post.author.name}</span></p>
              <h4 class="text-xl font-bold">${post.title}</h4>
              <p>${post.description}</p>
              <img src="images/line 1.png" class="" />
              <div class="min-w-full flex justify-between items-center">
              <div class="flex justify-between gap-4 w-full">
              <p class="flex justify-center items-center text-[#12132D99]"><i class="fa-solid fa-message"></i><span class="ml-2">${post.comment_count}</span></p>
              <p class="flex justify-center items-center text-[#12132D99]"><i class="fa-solid fa-eye"></i><span class="ml-2">${post.view_count}</span></p>
              <p class="flex justify-center items-center text-[#12132D99]"><i class="fa-regular fa-clock"></i><span class="ml-2">${post.posted_time}</span></p>
              </div>
              <div class="w-full text-end">
                <button onclick="handleViewPost('${post.title}', '${post.view_count}')"><i class="fa-regular fa-envelope-open bg-[#10B981] p-2 rounded-full text-white"></i></button>
              </div>
              </div>
            </div>
    `;

    cardContainer.appendChild(card);
  });
};

let count = "";

const handleViewPost = (data, counted) => {
  count++;
  const viewCount = document.getElementById("view-count");
  viewCount.innerText = count;

  const viewContainer = document.getElementById("view-card");

  const viewCard = document.createElement("div");
  viewCard.classList = `bg-white w-[350px] mx-auto text-center p-4 flex mb-6 rounded-xl`;
  viewCard.innerHTML = `
  <h4 class="text-xl font-bold pr-6">${data}</h4>
   <p class="flex justify-center items-center text-[#12132D99]"><i class="fa-solid fa-eye"></i><span class="ml-2">${counted}</span></p>
  `;
  viewContainer.appendChild(viewCard);
};

const handleSearch = () => {
  // e.preventDefault();
  const inputFeild = document.getElementById("input-feild");
  const value = inputFeild.value;

  loadAllPostCategory(value);
};

const lastPost = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await res.json();

  const lastPostContainer = document.getElementById("last-post-container");

  data.forEach((post) => {
    let authorName = "";
    if (post.author.designation) {
      authorName = `${post.author.designation}`;
    } else {
      authorName = `Unknown`;
    }
    let postedDate = "";
    if (post.author.posted_date) {
      postedDate = `${post.author.posted_date}`;
    } else {
      postedDate = `Unknown`;
    }
    const card = document.createElement("div");
    card.classList = `bg-base-300 w-[380px] h-[520px] shadow-xl rounded-xl`;
    card.innerHTML = `
    <figure class="px-10 pt-10">
              <img
                src="${post.cover_image}"
                alt="Shoes"
                class="rounded-xl"
              />
            </figure>
            <div class="px-10 pt-10 space-y-2">
              <p class="space-x-4">
                <i class="fa-solid fa-calendar-days"></i
                ><span>${postedDate}</span>
              </p>
              <h3 class="font-bold">${post.title}</h3>
              <p>${post.description}</p>

              <div class="flex justify-start items-center gap-6">
                <img class="w-16 rounded-full" src="${post.profile_image}" alt="" />
                <div class="">
                  <h3 class="font-bold">${post.author.name}</h3>
                  <p>${authorName}</p>
                </div>
              </div>
            </div>
    `;
    lastPostContainer.appendChild(card);
  });

  console.log(data);
};

loadAllPostCategory("");
lastPost("");
