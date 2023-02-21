const hamburgerMenu = document.getElementById("bar");
const navbar = document.getElementById("navbar");
const closeicon = document.getElementById("close");

if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', (e) => {
        navbar.classList.add('show');
    })
}

if (closeicon) {
    closeicon.addEventListener('click', (e) => {
        navbar.classList.remove('show');
    })
}


// cart items

const productcontainer1 = document.querySelector('#product-container1');

const productcontainer2 = document.querySelector('#product-container2');

// data storage
let basket = JSON.parse(localStorage.getItem("data")) || []


// for section 1 products

const generateShopItems1 = () => {

    return (productcontainer1.innerHTML = shopItemsData1.map((data) => {

        let {id, name, price, img} = data;
        let search = basket.find((x)=>x.id === id) || []

     return  `
        <div id=product-id-${id} class="product">
            <img src=${img} alt="shirt">
            <div class="description">
                <span>Allure</span>
                <h5>${name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
        
                <div class="price-quantity">
                    <h4>$ ${price}</h4>
                   <div class="buttons">
                       <i onClick="decrement(${id})" class="fas fa-minus"></i>
                       <div id=${id} class="quantity">
                       ${search.item === undefined? 0 : search.item}
                       </div>
                       <i onClick="increment(${id})" class="fas fa-plus"></i>
                   </div>
                </div>
            </div>
          </div>
        ` 
    }).join(""));

};
generateShopItems1();


//  for section 2 products
const generateShopItems2 = () => {
    return (productcontainer2.innerHTML = shopItemsData2.map((data) => {

        let {id, name, price, img} = data;
        let search = basket.find((x)=>x.id === id) || []

        return `
            
        <div id=product-id-${id} class="product">
        <img src=${img} alt="shirt">
        <div class="description">
            <span>Allure</span>
            <h5>${name}</h5>
            <div class="star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>

            <div class="price-quantity">
                <h4>$ ${price}</h4>
            <div class="buttons">
                <i onclick="decrement(${id})" class="fas fa-minus"></i>
                <div id=${id} class="quantity">
                ${search.item === undefined? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="fas fa-plus"></i>
            </div>
            </div>
        </div>
        </div>
`
    }).join(""));
       
};

generateShopItems2()

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
      localStorage.setItem("data", JSON.stringify(basket));

}

// decrement function
let decrement = (id) => {
    let search = basket.find((card) => card.id === id);
      
    if(search === undefined || search.item === 0) return;
    else{
    search.item -= 1;
    }

    updateItemsCount(id);
    basket = basket.filter((x)=>x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));

}

// updateitemscount function
let updateItemsCount = (id) => {

    let search = basket.find((card) => card.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation()
};

// calculating the totals

let calculation = () => {
    
let carticons = document.querySelectorAll('#count-items');

Array.from(carticons).forEach((carticon) => {

carticon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x+y, 0);
    
});

}

calculation();