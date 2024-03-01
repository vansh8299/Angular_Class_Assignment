function fetchdat() {
  return new Promise((resolve, reject) => {
    let arr = [11, 50, 50, 80];
    setTimeout(() => {
      console.log("Data Fetching...");

      resolve(arr);
    }, 3000);
  });
}

function even(data) {
  return new Promise((resolve, reject) => {
    console.log(data);
    let arr1 = [];
    setTimeout(() => {
      for (let i = 0; i < data.length; i++) {
        if (data[i] % 2 == 0) {
          arr1.push(data[i]);
        }
      }
    }, 2000);
    resolve(arr1);
  });
}

function sum(data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let s = 0;
      for (let j = 0; j < data.length; j++) {
        s += data[j];
      }
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
