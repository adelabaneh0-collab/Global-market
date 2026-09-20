
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {products, getProduct} from '../data/products-data.js';


export let cart;
 loadFromStorage();

export function loadFromStorage () 
{
  cart=JSON.parse(localStorage.getItem('cart'));
  if (!cart) {cart=[];}
}

function saveToStorage () 
{
  localStorage.setItem('cart',JSON.stringify(cart))
}


export function addToCart(productId) 
{ productId = Number(productId);let matchingItem;
  cart.forEach((cartItem) => {if (productId === cartItem.id) {matchingItem = cartItem;}});
  if (matchingItem) {matchingItem.quantity += 1;} else {cart.push({id: productId,quantity: 1});}saveToStorage();
}



export function removeFromCart (productId) 
{ productId = Number(productId);const newCart=[];
  cart.forEach((cartItem)=>{if (productId !== cartItem.id) {newCart.push(cartItem)}})
  cart=newCart;
  saveToStorage();
}



export function renderOrderSummary () {
   let cartSummaryHTML = '';
   if (cart.length === 0) {cartSummaryHTML = `<div class="empty-cart-div"><p class="empty-cart-p">Your cart is empty.</p></div>`;} 
   else {
        
        cart.forEach((cartItem) => {const productId = cartItem.id;const matchingProduct=getProduct(cartItem.id);if (!matchingProduct) {return;}
          
          cartSummaryHTML +=
        `
              <div class="product-card">
            <div class="product-image-wrap">
              <img src="${matchingProduct.image}" class="products-img">

              <div class="product-hover-buttons">
                    <button class="product-action-btn-3 link-primary js-delete-link js-delete-link-${cartItem.id}" data-product-id="${matchingProduct.id}">Delete</button>
                    <button class="product-action-btn-2 js-view-product" data-product-id="${matchingProduct.id}">VIEW</button>
                    <span class="quantity-label-span">Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
              </div> 
            </div>

            <div class="product-info">
              <p class="brand-name">${matchingProduct.brandName}</p>
              <p class="product-name">${matchingProduct.name}</p>
              <p class="price">$${(matchingProduct.priceCents / 100).toFixed(2)}</p>
            </div>

            <div class="product-quantity js-product-quantity-${matchingProduct.id}">


                  </div>

          </div>
        `;
        });

      }
        document.querySelector('.js-cart-main-grid').innerHTML=cartSummaryHTML

        document.querySelectorAll('.js-delete-link').forEach((link) => {link.addEventListener('click', () => {const productId = link.dataset.productId;
          removeFromCart(productId);renderOrderSummary();renderPaymentSummary();
        });
      });
   
}


export function renderPaymentSummary () 
{let productsPriceCents=0;
  cart.forEach((cartItem)=>{const product=getProduct(cartItem.id);productsPriceCents+=product.priceCents*cartItem.quantity;})
  
  const totalBeforeTaxCents=productsPriceCents
  const taxCents=totalBeforeTaxCents*0.8;
  const totalCents=totalBeforeTaxCents+taxCents


document.getElementById("summarySubtotal").innerHTML=`$${(totalBeforeTaxCents/ 100).toFixed(1)}`
document.getElementById("summaryTax").innerHTML=`$${(taxCents/ 100).toFixed(1)}`
document.getElementById("summaryTotal").innerHTML=`$${(totalCents/ 100).toFixed(1)}`

}
  



// starts of the quick view modal section

const quickViewModal = document.getElementById("quickViewModal");
const closeModalBtn = document.getElementById("closeModalBtn");

const modalProductImage = document.getElementById("modalProductImage");
const modalBrandName = document.getElementById("modalBrandName");
const modalProductName = document.getElementById("modalProductName");
const modalProductCategory = document.getElementById("modalProductCategory");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalAddCartBtn = document.querySelector(".modal-add-cart-btn");


// Listen for clicks on the products container

const productsGrid = document.querySelector(".js-cart-main-grid");

if (productsGrid) {

  productsGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".js-view-product");
    if (!button) {return;};
    const productId = Number(button.dataset.productId);
    const matchingProduct = products.find((product) => {return product.id === productId;});

    if (matchingProduct) 
    {

      modalProductImage.src = matchingProduct.image;
      modalBrandName.textContent = matchingProduct.brandName;
      modalProductName.textContent = matchingProduct.name;
      modalProductCategory.textContent = matchingProduct.category;
      modalProductPrice.textContent =
        `$${(matchingProduct.priceCents / 100).toFixed(2)}`;

      modalAddCartBtn.dataset.productId = productId;
      quickViewModal.classList.add("show");
    }
  });

}


// Close modal

if (closeModalBtn) 
  {

  closeModalBtn.addEventListener("click", () => {quickViewModal.classList.remove("show");});

}

// end of the quick view modal section

















