import {products, getProduct} from './data/products-data.js';
import {cart, removeFromCart} from './data/gm-cart.js';



function renderCheckoutProducts () {if (cart.length===0) {document.querySelector('.check-out-main-grid').innerHTML=`<p>you have no items to check out.</p>`;return;}
  let checkoutProducts='';
  cart.forEach((cartItem)=>{
    const product=getProduct(cartItem.id);
    checkoutProducts+=
    `
      <div class="product-outer-div" style="border-top:solid;border-width:1px;border-color:rgba(255, 255, 255, 0.07);">

            <div>
              <img class="product-image" src="${product.image}">
            </div>

            <div>
              <p class="co-company-name-p">${product.brandName}</p>
              <p class="co-product-name-p">${product.name}</p>
              <p class="co-category-p">${product.category}</p>
            </div>

            <div>
              <p>3 pcs</p>
            </div>

            <div>
              <p>$${(product.priceCents / 100).toFixed(2)}</p>
            </div>

            <div>
              <button class="co-delete-button js-co-delete-button" data-product-id="${product.id}">
                Delete Item
              </button>
            </div>

          </div>
     `
  })

const checkoutGrid=document.querySelector('.check-out-main-grid');
if (checkoutGrid) {checkoutGrid.innerHTML = checkoutProducts;}
checkoutDeleteButton();
}
if (document.querySelector('.check-out-main-grid')) {renderCheckoutProducts();}




function checkoutDeleteButton () {
  let deleteButton=document.querySelectorAll('.js-co-delete-button');
  deleteButton.forEach((button)=>{button.addEventListener('click',()=>{const productId=button.dataset.productId;
    removeFromCart(productId);renderCheckoutProducts();renderCheckoutPayment();
  })})

}

checkoutDeleteButton();


function renderCheckoutPayment () {
  let productsPriceCents=0;
  cart.forEach((cartItem)=>{const product=getProduct(cartItem.id);productsPriceCents+=product.priceCents*cartItem.quantity;})

  const totalBeforeTaxCents=productsPriceCents
  const taxCents=totalBeforeTaxCents*0.8;
  const totalCents=totalBeforeTaxCents+taxCents

  document.querySelector('.js-subtotal-p').innerHTML=`$${(totalBeforeTaxCents/ 100).toFixed(1)}`
  document.querySelector('.js-tax-p').innerHTML=`$${(taxCents/ 100).toFixed(1)}`
  document.querySelector('.js-total-p').innerHTML=`$${(totalCents/ 100).toFixed(1)}`


}
renderCheckoutPayment();












