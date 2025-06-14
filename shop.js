const shopContainer = document.querySelector(".shopcontainer");
let homeBtn2 = document.querySelector(".homebtn");
const cartContainer = document.querySelector(".cartcontainer");
const cartBtn = document.querySelector(".cart");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.querySelector(".cartcount");
const blurDiv = document.querySelector(".blur");
const confirmItem = document.querySelector(".confirm-item");
const cartGeneral = document.querySelector(".cart-general");
const shopbtn2 = document.querySelector(".shopbtn");
const signBtn2 = document.querySelector(".signbtn");
const searchInput = document.querySelector(".search");
const searchInput2 = document.querySelector(".search2");
const searchBtn = document.querySelector(".searchbtn")
const searchBtn2 = document.querySelector(".searchbtn2")
const navBack2 = document.querySelector(".navback")
let allProducts = []
const mainShop = document.querySelector(".mainshop")

async function fetchData() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  allProducts = data.products
  showItem(allProducts);
}
fetchData();

mainShop.addEventListener("click",()=>{
  navBack2.classList.add("navhidden")
})

searchBtn.addEventListener("click",()=>{
  const query = searchInput.value.toLowerCase()
  const filtered = allProducts.filter((item)=> item.title.toLowerCase().includes(query))
  showItem(filtered)
})

searchBtn2.addEventListener("click",()=>{
  const query = searchInput2.value.toLowerCase()
  const filtered = allProducts.filter((item)=> item.title.toLowerCase().includes(query))
  showItem(filtered)
   navBack2.classList.add("navhidden")
})

 searchInput.addEventListener("input",()=>{
  const query = searchInput.value.toLowerCase()
  const filtered = allProducts.filter((item)=> item.title.toLowerCase().includes(query))
  showItem(filtered)
})

 searchInput2.addEventListener("input",()=>{
  const query = searchInput2.value.toLowerCase()
  const filtered = allProducts.filter((item)=> item.title.toLowerCase().includes(query))
  showItem(filtered)
})

function showItem(data) {
  shopContainer.textContent = "";
  data.map((item) => {
    const imgDiv = document.createElement("div");
    imgDiv.className = "shop-img-div";
    const img = document.createElement("img");
    img.src = item.images[0];
    const downDiv = document.createElement("div");
    downDiv.className = "shop-down-div";
    const name = document.createElement("h2");
    name.textContent = item.title;
    const brand = document.createElement("p");
    brand.textContent = item.brand;
    const price = document.createElement("span");
    price.textContent = `$${item.price}`;
    const addBtn = document.createElement("button");
    addBtn.innerHTML = `<i class="fa-solid fa-cart-plus"></i><p>add to cart</p>`;

    addBtn.addEventListener("click", (e) => {
      showInput(e.currentTarget, item);
    });

    imgDiv.append(img);
    downDiv.append(name, brand, price, addBtn);
    const itemDiv = document.createElement("div");
    itemDiv.className = "shop-item-div";
    itemDiv.append(imgDiv, downDiv);
    shopContainer.append(itemDiv);
  });
}

function showInput(addbtn, product) {
  const inputAmount = document.createElement("input");

  inputAmount.type = "number";
  inputAmount.value = 1;
  inputAmount.className = "inputamount";
  addbtn.replaceWith(inputAmount);
  cart.map((item) => {
    if (item.name == product.title) {
      inputAmount.value = item.amount ;
    }
  });
  inputAmount.addEventListener("change", () => {
    if (inputAmount.value >= 1) {
      cart.map((item) => {
        if (item.name === product.title) {
          item.amount = Number(inputAmount.value);
          item.totalPrice = inputAmount.value * item.price;
        }
        showcart();
        showConfirm();
      });
    } else {
      inputAmount.replaceWith(addbtn);
    }
  });

  const cartObj = {
    name: product.title,
    amount: Number(inputAmount.value),
    price: product.price,
    totalPrice: product.price * inputAmount.value,
    image: product.images[0],
  };

  //to update the value if it has already be in the cart
  if (cart.length > 0) {
    cart.map((item) => {
      if (item.name != product.title) {
        cart.push(cartObj);
      }
    });
  } else {
    cart.push(cartObj);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showcart();
  showConfirm();
}

function updateCount() {
  cartCount.textContent = cart.length;
}

window.addEventListener("DOMContentLoaded", updateCount);

function showcart() {
  updateCount();
  cartContainer.textContent = "";
  let total = 0;
  cart.map((item) => {
    total = total + item.totalPrice;
  });

  const totalOrder = document.createElement("div");
  totalOrder.className = "total-order";
  const orderPara = document.createElement("p");
  orderPara.textContent = "total order";
  const orderPrice = document.createElement("span");
  orderPrice.textContent = `$${total.toFixed(2)}`;
  totalOrder.append(orderPara, orderPrice);

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "confirm order";
  confirmBtn.className = "confirm";
  confirmBtn.addEventListener("click", () => {
    if (blurDiv.classList.contains("blurhidden")) {
      blurDiv.classList.remove("blurhidden");
    } else {
      blurDiv.classList.add("blurhidden");
    }
  });

  cart.map((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item-div";
    const topDiv = document.createElement("div");
    topDiv.className = "cart-top-div";
    const name = document.createElement("h2");
    name.textContent = item.name;
    const downDiv = document.createElement("div");
    downDiv.className = "cart-down-div";
    const amount = document.createElement("p");
    amount.textContent = item.amount;
    const price = document.createElement("span");
    price.textContent = `$${item.price}`;
    const totalPrice = document.createElement("span");
    totalPrice.textContent = `$${item.totalPrice.toFixed(2)}`;
    const delebtn1 = document.createElement("button");
    delebtn1.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    delebtn1.className = "delete";
    delebtn1.addEventListener("click", () => {
      deleteFunc(item);
    });
    downDiv.append(amount, price, totalPrice);
    topDiv.append(name, downDiv);
    itemDiv.append(topDiv, delebtn1);
    cartContainer.append(itemDiv, totalOrder, confirmBtn);
  });
}

homeBtn2.addEventListener("click", () => {
  window.location.href = "/index.html";
});

cartBtn.addEventListener("click", () => {
  showcart();
  if (cartGeneral.classList.contains("hidden")) {
    if (cart.length >= 1) {
      cartGeneral.classList.remove("hidden");
    }
  } else {
    cartGeneral.classList.add("hidden");
  }
});

function deleteFunc(item) {
  cart = cart.filter((i) => i !== item);
  localStorage.setItem("cart", JSON.stringify(cart));
  showcart();
  if (cart.length < 1) {
    cartGeneral.classList.add("hidden");
    window.location.href = "/shop.html";
  }
}

function showConfirm() {
  confirmItem.textContent = "";
  let total = 0;
  cart.map((item) => {
    total = total + item.totalPrice;
  });

  const orderPrice = document.createElement("span");
  orderPrice.textContent = `$${total.toFixed(2)}`;
  orderPrice.className = "confirm-total";

  const continueBtn = document.createElement("button");
  continueBtn.textContent = "continue shopping";
  continueBtn.className = "continue";
  continueBtn.addEventListener("click", () => {
    window.location.href = "/shop.html";
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  });
  cart.map((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "confirm-item-div";
    const img = document.createElement("img");
    img.src = item.image;
    const firstDiv = document.createElement("div");
    firstDiv.className = "first-div";
    const name = document.createElement("h2");
    name.textContent = item.name;
    const amount = document.createElement("p");
    amount.textContent = item.amount;
    const price = document.createElement("span");
    price.textContent = `$${item.price.toFixed(2)}`;
    const secondDiv = document.createElement("div");
    secondDiv.className = "second-div";
    secondDiv.append(name, amount);
    firstDiv.append(img, secondDiv);
    itemDiv.append(firstDiv, price);
    confirmItem.append(itemDiv, orderPrice, continueBtn);
  });
}

shopbtn2.addEventListener("click", () => {
  window.location.href = "/shop.html";
});

signBtn2.addEventListener("click", () => {
  if (!localStorage.getItem("proArr")) {
    window.location.href = "/signup.html";
  }
});
