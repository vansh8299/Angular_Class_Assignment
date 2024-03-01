function morningroutine1(completed1) {
  console.log("Taking Bath...");
  setTimeout(() => {
    completed1();
    morningroutine2(completed2);
  }, 2000);
}
function completed1() {
  console.log("Bath done!");
}

function morningroutine2(completed2) {
  console.log("Dressing....");
  setTimeout(() => {
    completed2();
    morningroutine3(completed3);
  }, 3000);
}
function completed2() {
  console.log("Dressing done!");
}
function morningroutine3(completed2) {
  console.log("Having Breakfast....");
  setTimeout(() => {
    completed3();
  }, 3000);
}

function completed3() {
  console.log("Breakfast done!");
}

morningroutine1(completed1);
