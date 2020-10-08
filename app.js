    // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



//CART

   let cart= document.querySelectorAll('.addCart');
            
    let girlCart = document.querySelectorAll('.girlCart');

        
        let products = [
            {
            name: "Black joggers",
            tag: "blackjoggers",
            price: 110,
            inCart: 0 
            },
              {
            name: "Slim fitted black T",
            tag: 'slimfiitedBlack',
            price: 25,
            inCart: 0 
            },
              {
            name: "White Jumper",
            tag: "whiteJumper",
            price: 21,
            inCart: 0 
            },
              {
            name: "Blue waterproof Jacket",
            tag:"waterproofJacket",
            price: 65,
            inCart: 0 
            },
              {
            name: "Grey Slim fit Shirt",
            tag: "slimFittedGrey",
            price: 22,
            inCart: 0 
            },
              {
            name: "Pinapple Pink Shirt",
            tag: "pinkShirt",
            price: 55,
            inCart: 0 
            },
            //WOMAN CART
            
            {
            name: "White Breezy Dress",
            tag: "WhiteDress",
            price: 30,
            inCart: 0 
            },
            {
            name: "White Blazer",
            tag: "Whiteblazer",
            price: 19,
            inCart: 0 
            },
            {
            name: "Grey Tracksuit",
            tag: "Greytracksuit",
            price: 39,
            inCart: 0 
            },
            {
            name: "Summer Pink Blouse",
            tag: "summer",
            price: 29,
            inCart: 0 
            },
            {
            name: "Black Jeggers",
            tag: "BlackJeggers",
            price: 15,
            inCart: 0 
            },
            {
            name: "Pink Silk Dress",
            tag: "Pinkslik",
            price: 22,
            inCart: 0 
            },
            
            //ACC
            
             {
            name: "Crystal Blue Watch",
            tag: "crystalbluewatch",
            price: 19,
            inCart: 0 
            },
            {
            name: "Butterfly Necklace",
            tag: "butterfly",
            price: 25,
            inCart: 0 
            },
            {
            name: "Black Fred Perry Cap",
            tag: "blackcap",
            price: 21,
            inCart: 0 
            }
            
            
        ];
        
        for(let i = 0; i< cart.length; i++){
            cart[i].addEventListener('click', () => {
                cartNumbers(products[i]);
                totalCost(products[i]);
            })
        }
        
        function onLoadCartNumbers(){
              let productNumbers = localStorage.getItem('cartNumbers');
            
            if(productNumbers){
                document.querySelector('.cart span').textContent = productNumbers;
            }
                
        }
        
    
        function cartNumbers(product) {
            
            
            let productNumbers = localStorage.getItem('cartNumbers');
                        
            productNumbers = parseInt(productNumbers);
            
           
           if (productNumbers) {
               localStorage.setItem('cartNumbers', productNumbers + 1);
               document.querySelector('.cart span').textContent = productNumbers + 1;
           } else {
               localStorage.setItem('cartNumbers', 1);
               document.querySelector('.cart span').textContent = 1;
           }
            
            setItems(product);
            
        }
        
        function setItems(product) {
           let cartItems = localStorage.getItem('productsInCart');
            //parseing JSON to js object
            cartItems = JSON.parse(cartItems);
            
           
            if(cartItems != null){
                
                if(cartItems[product.tag] == undefined) {
                    cartItems = {
                        ...cartItems, 
                        [product.tag]: product
                    }
                }
              cartItems[product.tag].inCart += 1;
            } else {
                
            product.inCart = 1;
            cartItems = {
                [product.tag]: product
            }
            }
           
            localStorage.setItem("productsInCart", JSON.stringify (cartItems));
        }

    function totalCost(product) {
//        console.log("The product price is", product.price);
        let cartCost = localStorage.getItem('totalCost');
    
        console.log("my cartCost is", cartCost);
       
        
        if(cartCost != null) {
            cartCost = parseInt(cartCost);
            localStorage.setItem("totalCost", cartCost + product.price);
        } else {
             localStorage.setItem("totalCost", product.price);
        }
        
    }

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
      
    let productContainer = document.querySelector(".product");
    let cartCost = localStorage.getItem('totalCost');
    
    console.log(cartItems);
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
           productContainer.innerHTML += `
    <div class = "product">
     
        <img src = "./fashion/Men/${item.tag}.jpg">
         <span class = "product"> ${item.name}</span>
    </div>

    <div class = "price"> 
        ${item.price}
    </div>

    <div class ="quantity">
        <ion-icon class="decrease"
        name="arrow-dropleft-circle"></ion-icon>
        <span>${item.inCart}</span>
    </div>

    <div class ="total">
        £${item.inCart * item.price}
    </div>
    ` ;
        });
           
           productContainer.innerHTML  +=`
    <div class="basketTotalContainer">
        <h6 class="basketTotalTitle">
            Basket total
        </h6>
        <h6 class = "basketTotal">
            £${cartCost}
        </h6>
    </div>
`
    
    }
}


         
        onLoadCartNumbers();
        displayCart()