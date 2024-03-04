let employee = true;

function employeecheck() {
  return new Promise((resolve, reject) => {
    console.log("Fetching Employee Name....");
    setTimeout(() => {
      if (employee) {
        const name = ["Disha", "Ankit", "Nitanshi"];
        console.log("Fetched Employee Name");
        resolve(name);
      } else {
        reject("System ERROR");
      }
    }, 2000);
  });
}
employeecheck()
  .then((name) => {
    console.log(name);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Angular Team");
  });
