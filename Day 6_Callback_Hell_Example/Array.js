// const url1 = "www.javatpoint.com";
// const url2 = "www.example.com";

// const url3 = "www.google.com";

// function download1(download2, process1, url1) {
//   console.log(`Downloading.....${url1}`);
//   setTimeout(() => {
//     process1(url1);
//     download2(process2, url2);
//   }, 5000);
// }
// function process1(url1) {
//   console.log(`Processing .....${url1}`);
// }

// function download2(download3, process2, url2) {
//   console.log(`Downloading.....${url2}`);
//   setTimeout(() => {
//     process2(url2);
//     download3(process3, url3);
//   }, 3000);
// }
// function process2(url2) {
//   console.log(`Processing .....${url2}`);
// }

// function download3(process3, url3) {
//   console.log(`Downloading.....${url3}`);
//   setTimeout(() => {
//     process3(url3);
//   }, 1000);
// }
// function process3(url3) {
//   console.log(`Processing .....${url3}`);
// }
// function process3(url3) {
//   console.log(`Processing .....${url3}`);
// }

// download1(process1, url1);

// Object

const myself = {
  name: "Vansh",
  Age: "21",
  Profession: "Software Developer",
};
function details(Job, myself) {
  console.log(myself);
  setTimeout(() => {
    Job(myself);
  }, 2000);
}

function Job(myself) {
  console.log(myself.Profession);
}

details(Job, myself);
