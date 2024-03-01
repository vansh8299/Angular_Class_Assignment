const select = document.querySelector("select");
const para = document.querySelector("p");
const html = document.querySelector("html");

select.addEventListener("change", routine);

function routine() {
  const value = select.value;
  let img = document.querySelector("#Image");
  if (value === "Ankit") {
    while (img.firstChild) {
      img.removeChild(img.firstChild);
    }

    for (let i = 1; i <= 4; i++) {
      para.textContent =
        "Ankit is a cricket Player and he is very supportive in nature. I am very greatful to have him in my angular team";
      let image = document.createElement("img");

      if (i == 1) {
        image.src = "Ankit1.jpeg";
      }
      if (i == 2) {
        image.src = "Ankit2.jpeg";
      }
      if (i == 3) {
        image.src = "Ankit3.jpeg";
      }
      if (i == 4) {
        image.src = "Ankit4.jpeg";
      }

      img.appendChild(image);
    }
    html.style.background = "red";
    html.style.color = "white";
  } else if (value === "Disha") {
    para.textContent =
      "Disha is very supportive in nature and she helped me a lot while working with CSS.";
    while (img.firstChild) {
      img.removeChild(img.firstChild);
    }
    for (let i = 1; i <= 4; i++) {
      let image = document.createElement("img");
      if (i == 1) {
        image.src = "Disha1.jpeg";
      }
      if (i == 2) {
        image.src = "Disha2.jpeg";
      }
      if (i == 3) {
        image.src = "Disha3.jpeg";
      }
      if (i == 4) {
        image.src = "Disha4.jpeg";
      }
      let img = document.querySelector("#Image");
      img.appendChild(image);
    }
    html.style.background = "green";
    html.style.color = "purple";
  } else if (value == "Nitanshi") {
    while (img.firstChild) {
      img.removeChild(img.firstChild);
    }
    for (let i = 1; i <= 4; i++) {
      para.textContent =
        "Nitanshi is a very nice group memberand she is also very supportive in nature.";
      let image = document.createElement("img");
      if (i == 1) {
        image.src = "Nitanshi1.jpeg";
      }
      if (i == 2) {
        image.src = "Nitanshi2.jpeg";
      }
      if (i == 3) {
        image.src = "Nitanshi3.jpeg";
      }
      if (i == 4) {
        image.src = "Nitanshi4.jpeg";
      }
      let img = document.querySelector("#Image");
      img.appendChild(image);
    }
    html.style.background = "violet";
    html.style.color = "red";
  }
}
