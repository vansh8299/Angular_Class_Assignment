function fetchdat() {
  return new Promise((resolve, reject) => {
    let arr = [11, 13, 50, 80];
    setTimeout(() => {
      console.log("Data Fetching...");
      resolve(arr);
    }, 3000);
  });
}

function even(data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let arr1 = data.filter((n) => n % 2 === 0);
      resolve(arr1);
    }, 2000);
  });
}

function sum(data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let s = data.reduce((a, i) => a + i);
      resolve(s);
    }, 2000);
  });
}

async function main() {
  let data = await fetchdat();
  let evendata = await even(data);
  let add = await sum(evendata);
  console.log(add);
}

main();
