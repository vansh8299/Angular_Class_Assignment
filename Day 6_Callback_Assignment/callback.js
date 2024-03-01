function step1(step1Complete) {
  console.log("Mixing...");
  setTimeout(() => {
    step1Complete();
    step2(step2Complete);
  }, 2000);
}

function step1Complete() {
  console.log("Mixing Completed");
}
function step2(step2Complete) {
  console.log("Chilling...");
  setTimeout(() => {
    step2Complete();
    step3(step3Complete);
  }, 2000);
}
function step2Complete() {
  console.log("Chilling Completed");
}

function step3(step3Complete) {
  console.log("Baking...");
  setTimeout(() => {
    step3Complete();
  }, 2000);
}
function step3Complete() {
  console.log("Baking Completed");
}

step1(step1Complete);
