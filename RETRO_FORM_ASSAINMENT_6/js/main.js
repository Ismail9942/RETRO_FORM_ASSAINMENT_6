const loadAllPostCategory = async (category) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/retro-forum/posts?${category}`
  );
  const data = await res.json();

  const posts = data.posts;
  postAllCard(posts);
};

const postAllCard = (posts) => {
  const cardContainer = document.getElementById("dynamic-card-container");
  posts.forEach((post) => {
    const card = document.createElement("div");
    card.classList = `bg-[#797DFC26] p-6 rounded-2xl min-w-fit mt-6 flex gap-16`;
    card.innerHTML = `
            <div class="indicator">
              <span id="is-active" class="indicator-item badge  bg-green-400"></span>;

            <div class="bg-base-300 grid h-32 w-32 place-items-center"><img class="rounded-lg" src="${post.image}" alt=""></div>
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
    console.log(post);
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
  console.log(data, counted);
};

const handleInputValue = () => {
  // e.preventDefault();
  const inputFeild = document.getElementById("input-feild");
  const value = inputFeild.value;

  loadAllPostCategory(value);
};

loadAllPostCategory();
