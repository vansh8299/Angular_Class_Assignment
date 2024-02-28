const select = document.querySelector("select");
const para = document.querySelector("p");
const html = document.querySelector("html");

select.addEventListener("change", routine);

function routine() {
  const value = select.value;
  switch (value) {
    case "Monday":
      workday();

      html.style.background = "red";
      html.style.color = "white";
      break;
    case "Tuesday":
      workday();
      html.style.background = "green";
      html.style.color = "purple";
      break;
    case "Wednesday":
      workday();
      html.style.background = "blue";
      html.style.color = "white";
      break;
    case "Thursday":
      workday();
      html.style.background = "yellow";
      html.style.color = "red";
      break;
    case "Friday":
      workday();
      html.style.background = "purple";
      html.style.color = "white";
      break;
    case "Saturday":
      workday();
      html.style.background = "orange";
      html.style.color = "pink";
      break;
    default:
      para.textContent =
        "sleep - 10 hrs, office - 0 hrs, food 1.5hrs, bath - 1hr, Explore more things - 2hrs, cleaning - 1hr, study - 3hr";
      html.style.background = "black";
      html.style.color = "white";
      break;
  }
}
function workday() {
  para.textContent =
    "sleep - 8 hrs, office - 7hrs, food - 1.5hrs, bath - 1hr, Explore more things - 2hrs";
}
