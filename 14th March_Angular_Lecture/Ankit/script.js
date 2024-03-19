let select = document.querySelector("select");
let showcontent = function () {
  const mem = select.value;
  let image = document.querySelector("#pic");
  let img = document.createElement("img");
  let para = document.querySelector("#detail");

  if (mem === "Ankit") {
    while (image.firstChild) {
      image.removeChild(image.firstChild);
    }
    img.src = "Ankit.jpeg";
    img.style.width = "400px";
    img.style.height = "400px";
    img.style.marginLeft = "400px";
    img.style.marginTop = "100px";
    img.style.border = "5px solid purple";
    image.appendChild(img);
    para.innerHTML = "Contact Details";
    para.innerHTML =
      "<a href='https://github.com/Akki0706'> Github </a>  <a href='https://in.linkdin.com/'>Linkedin</a>";
    document.body.style.backgroundColor = "Yellow";
  } else if (mem === "Vansh") {
    while (image.firstChild) {
      image.removeChild(image.firstChild);
    }
    img.src = "Vansh.jpeg";
    img.style.width = "400px";
    img.style.height = "400px";
    img.style.marginLeft = "400px";
    img.style.marginTop = "100px";
    img.style.border = "5px solid purple";
    image.appendChild(img);
    para.innerHTML = "Conatct Details";
    para.innerHTML =
      " <a Contact Details: href='https://github.com/vansh8299'> Github </a>  <a href='https://in.linkedin.com/'>Linkedin</a>";
    document.body.style.backgroundColor = "purple";
  } else if (mem === "Disha") {
    while (image.firstChild) {
      image.removeChild(image.firstChild);
    }
    img.src = "Disha.jpeg";
    img.style.width = "400px";
    img.style.height = "400px";
    img.style.marginLeft = "400px";
    img.style.marginTop = "100px";
    img.style.border = "5px solid purple";
    image.appendChild(img);
    para.innerHTML = "Conatct Details";

    para.innerHTML =
      "<a Contact Details: href='https://github.com/DishaSachdeva-02'> Github </a>  <a href='https://www.linkedin.com/in/disha-sachdeva-740122249'>Linkdin</a>";
    document.body.style.backgroundColor = "blue";
  } else if (mem === "Nitanshi") {
    while (image.firstChild) {
      image.removeChild(image.firstChild);
    }
    img.src = "Nitanshi.jpeg";
    img.style.width = "400px";
    img.style.height = "400px";
    img.style.marginLeft = "400px";
    img.style.marginTop = "100px";
    img.style.border = "5px solid purple";
    image.appendChild(img);
    para.innerHTML = "Conatct Details";
    para.innerHTML =
      " <a Contact Details: href='https://github.com/Nitanshi1'> Github </a> <a href='https://www.linkedin.com/in/nitanshi-agarwal-023989221'>Linkdin</a>";
    document.body.style.backgroundColor = "brown";
  }
};
select.addEventListener("change", showcontent);

pic.addEventListener("click", function () {
  let mem = select.value;
  let backgroundColor = "";

  if (mem === "Vansh") {
    backgroundColor = "aqua";
  } else if (mem === "Ankit") {
    backgroundColor = "red";
  } else if (mem === "Disha") {
    backgroundColor = "Purple";
  } else if (mem === "Nitanshi") {
    backgroundColor = "Yellow";
  }

  document.body.style.backgroundColor = backgroundColor;
});

pic.addEventListener("click", function () {
  let mem = select.value;
  let message = "";

  if (mem === "Vansh") {
    message = "File Delete Kr di";
  } else if (mem === "Ankit") {
    message = "Confused Person";
  } else if (mem === "Disha") {
    message = "Our Doremon";
  } else if (mem === "Nitanshi") {
    message = "Nitanshi Tours and Travel";
  } else {
    message = "No image selected!";
  }
  alert(message);
});
