
  let products =null;
  fetch('product.json')
  .then(response => response.json())
  .then(data => {
      products = data;
      addDataToHTML();
})
  function addDataToHTML(){
       let listProductHTML=document.querySelector('.trending-proudct .row')
       listProductHTML.innerHTML='';

       if(products != null) // if has data
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('.card');
            newProduct.innerHTML =   
            `
            <div class="card"> 
            <div class="product-img">
                      <img src="${product.image}" class="card-img-top" alt="...">
                        <img class="image-overlay" src="${product.image2}" alt="">
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text"><span class="sale-price">${product.price}đ</span> 
                   
                    </div>
                    <button  class="btn btn-pink addtocart" onclick="addCart(${product.id})">Thêm vào giỏ hàng</button>
                </div>
        
        `;
           
            listProductHTML.appendChild(newProduct);

        });
    }
  }
  let listCart = [];
  function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('cart-list='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }   
    
}
checkCart();
function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));
    //// If this product is not in the cart
    if(!listCart[$idProduct]) 
    {
        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    }else{
        //If this product is already in the cart.
        //I just increased the quantity
        listCart[$idProduct].quantity++;
    }
    document.cookie = "cart-list=" + JSON.stringify(listCart)+ "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;" ;

    addCartToHTML();
    
}
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.cart-list');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');   
    let totalQuantity = 0;


    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('cart-list');
                newCart.innerHTML = 
                    `   <div id="incart-list"> 
                    <img src="${product.image2}" id="custom-image" alt="">
              
                <div class="item-info">
                    <h5 class="item-title">
                        <a href="#" >${product.name}</a>
                    </h5>
                    <div id="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>  
                    <div id="price">
                           ${product.price}
                    </div>
                </div>
                </div>  
                `;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.cart-list');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');   
    let totalQuantity = 0;


    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('cart-list');
                newCart.innerHTML = 
                    `   <div id="incart-list"> 
                    <img src="${product.image2}" id="custom-image" alt="">
              
                <div class="item-info">
                    <h5 class="item-title">
                        <a href="#" >${product.name}</a>
                    </h5>
                    <div id="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>  
                    <div id="price">
                           ${product.price}
                    </div>
                </div>
                </div>  
                `;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // if quantity <= 0 then remove product in cart
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }
    // save new data in cookie
    document.cookie = "cart-list=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
  
    // reload html view cart
    addCartToHTML();
}
