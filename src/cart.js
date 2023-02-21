// navbar 
const hamburgerMenu = document.getElementById("bar");
const navbar = document.getElementById("navbar");
const closeicon = document.getElementById("close");


if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', (e) => {
        navbar.classList.add('show');
    })
};

if (closeicon) {
    closeicon.addEventListener('click', (e) => {
        navbar.classList.remove('show');
    })
};


// cart 
let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = () => {
    
    let carticons = document.querySelectorAll('#count-items');
    
    Array.from(carticons).forEach((carticon) => {
    
    carticon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x+y, 0);
        
    });
    
    }
    
    calculation();

    // cart page 
    let label = document.getElementById('label');
    let shopppingCart = document.getElementById('shoppping-cart');


    let generateCartItems = () => {
        if(basket.length !== 0){
         return  (shopppingCart.innerHTML = basket.map((x)=>{
        
            let {id, item} = x;
            let search = shopItemsData1.find((y)=>y.id === id) || shopItemsData2.find((y)=>y.id === id) || [];
            return `
            <div class="cartitem">
            <img src=${search.img}></img>

            <div class="details">

            <div class="title-price-x">

            <h4 class="title-price">
            <p class="cart-item-name">${search.name}</p>
            <p class="cart-item-price">$ ${search.price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="fas fa-times"></i>
            
            </div>

            <div class="cart-btns buttons">
            <i onclick="decrement(${id})" class="fas fa-minus"></i>
            <div id=${id} class="quantity">${item}</div>
            <i onclick="increment(${id})" class="fas fa-plus"></i>
        </div>

            <h4 class="total-unit-price">$ ${item * search.price}</h4>

            </div>
          </div>
            `
         }).join("")) 
    
        }
        else {
            shopppingCart.innerHTML = ` `
            label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
            <button class="homebtn">Back to home</button>
            </a>
            `
        }
    }
    generateCartItems();

// increment function
let increment = (id) => {

    let search = basket.find((card) => card.id === id);
      
      if(search === undefined){
        basket.push(
            {
              id: id,
              item: 1,
            },
        )
    
      }else{
       search.item += 1;
      }

      updateItemsCount(id);
      generateCartItems();
      localStorage.setItem("data", JSON.stringify(basket));

};

// decrement function
let decrement = (id) => {
    let search = basket.find((card) => card.id === id);
      
    if(search === undefined || search.item === 0) return;
    else{
    search.item -= 1;
    }

    updateItemsCount(id);
    basket = basket.filter((x)=>x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));

};


// updateitemscount function
let updateItemsCount = (id) => {

    let search = basket.find((card) => card.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
    
};


let removeItem = (id) => {
    basket = basket.filter((x)=> x.id !== id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let totalAmount = () => {
    if(basket.length !== 0){
 let amount = basket.map((x) => {
    let {item, id} = x;
    let search = shopItemsData1.find((y)=>y.id === id) || shopItemsData2.find((y)=>y.id === id) || [];
    return item * search.price;
}).reduce((x,y)=>x+y,0);
    label.innerHTML =`
    <h3 class="bill">Total Bill : $ ${amount}</h3>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeall">Clear Cart</button>
    `
    }
    else return;
    
}

totalAmount();

let clearCart = () => {

    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
    
}