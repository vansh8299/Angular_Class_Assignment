// const mybuttonc = document.getElementById("mybuttonc");
const mybuttonu = document.getElementById("mybuttonu");
// const mybuttona = document.getElementById("mybuttona");
const myButton = document.getElementById("mybutton");

const DataService = (function () {
  async function fetchData(url) {
    const response = await fetch(url);
    try {
      if (!response.ok) {
        throw new Error("Failed to fetch....");
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return {
    fetchPosts: async function () {
      return await fetchData("https://jsonplaceholder.typicode.com/posts");
    },
    fetchUser: async function () {
      return await fetchData("https://jsonplaceholder.typicode.com/users");
    },
  };
})();

const UI = (function () {
  function displayPosts(posts) {
    const myPosts = document.getElementById("mypost");
    posts.forEach((post) => {
      const myPost = document.createElement("div");
      myPost.innerHTML = `
        <h2>${post.id}</h2>
        <p>${post.title}</p>
        <hr>
        `;
      myPosts.appendChild(myPost);
    });
  }
  function displayUser(users) {
    const myUsers = document.getElementById("myUser");
    users.forEach((user) => {
      const myUser = document.createElement("div");
      myUser.innerHTML = `
        <h2>${user.name}</h2>
        <p>${user.username}</p>
        <hr>
        `;
      myUsers.appendChild(myUser);
    });
  }
  return {
    displayPosts,
    displayUser,
  };
})();

async function doAllTask() {
  const posts = await DataService.fetchPosts();
  UI.displayPosts(posts);
  const users = await DataService.fetchUser();
  UI.displayUser(users);
}

// async function fetchDataalbums() {
//   try {
//     const resa = await fetch("https://jsonplaceholder.typicode.com/albums");

//     if (!resa.ok) {
//       throw new Error("Failed to fetch data....");
//     }

//     const album = await resa.json();

//     displayDataAlbum(album);
//   } catch (error) {
//     console.log(error);

//     document.getElementById("myData").innerHTML =
//       "Failed to fetch the data....";
//   }
// }

// function displayDataAlbum(album) {
//   const myDatau = document.getElementById("myData");

//   album.forEach((a) => {
//     const myAlbum = document.createElement("div");

//     myAlbum.innerHTML = `
//         <h2>${a.id}</h2>
//         <p>${a.title}</p>
//         <hr>
//         `;

//     myDatau.appendChild(myAlbum);
//   });
// }

// async function fetchDatapost() {
//   try {
//     const resp = await fetch("https://jsonplaceholder.typicode.com/posts");

//     if (!resp.ok) {
//       throw new Error("Failed to fetch data....");
//     }

//     const data = await resp.json();

//     displayData(data);
//   } catch (error) {
//     console.log(error);

//     document.getElementById("myData").innerHTML =
//       "Failed to fetch the data....";
//   }
// }
// function displayData(data) {
//   const myData = document.getElementById("myData");

//   data.forEach((post) => {
//     const myPost = document.createElement("div");

//     myPost.innerHTML = `

//         <h2>${post.title}</h2>

//         <p>${post.body}</p>

//         <hr>

//         `;

//     myData.appendChild(myPost);
//   });
// }

// mybuttonc.addEventListener("click", fetchDatacomment);
mybuttonu.addEventListener("click", doAllTask);
// mybuttona.addEventListener("click", fetchDataalbums);
myButton.addEventListener("click", doAllTask);
