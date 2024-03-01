let employeedata = {
  name: "Vansh",
  break: 5,
};

function fetch() {
  console.log("Fetching data...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(employeedata);
      console.log(employeedata);
    }, 1000);
  });
}

function breaktime(data) {
  console.log(data.break);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.break * 1000);
    }, 2000);
  });
}

function reduction(reduce) {
  return new Promise((resolve, reject) => {
    console.log("Reduced Amount");
    setTimeout(() => {
      resolve(reduce);
    });
  });
}

fetch().then(breaktime).then(reduction).then(console.log);
