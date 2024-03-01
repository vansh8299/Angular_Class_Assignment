function selctingcoffee(stepcoffee1) {
  console.log("Selecting Coffee....");
  setTimeout(() => {
    stepcoffee1();
    addtocart(stepcoffee2);
  }, 3000);
}

function stepcoffee1() {
  console.log("Selection Has Made");
}
function addtocart(stepcoffee2) {
  console.log("Adding to Cart....");
  setTimeout(() => {
    stepcoffee2();
    payment(stepcoffee3);
  }, 3000);
}
function stepcoffee2() {
  console.log("Added To Cart");
}

function payment(stepcoffee3) {
  console.log("Making Payment....");
  setTimeout(() => {
    stepcoffee3();
  }, 3000);
}
function stepcoffee3() {
  console.log("Order Placed");
}

selctingcoffee(stepcoffee1);
