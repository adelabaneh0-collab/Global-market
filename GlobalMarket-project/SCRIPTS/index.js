import {products, getProduct} from './data/products-data.js';
import {cart, addToCart} from './data/gm-cart.js';



export function renderProductsGrid () {
  let indexHTML='';

  products.forEach((product)=>{indexHTML+=
    `
            <div class="product-card">
      <div class="product-image-wrap">
        <img src="${product.image}" class="products-img">

        <div class="product-hover-buttons">
          <button class="product-action-btn-1 product-action-btn-1" data-product-id="${product.id}">🛒 ADD TO CART</button>
          <button class="product-action-btn-2 js-view-product" data-product-id="${product.id}">VIEW</button>
        </div> 
      </div>

      <div class="product-info">
        <p class="brand-name">${product.brandName}</p>
        <p class="product-name">${product.name}</p>
        <p class="price">$${(product.priceCents / 100).toFixed(2)}</p>
      </div>
    </div>
    
    `
  })
    const productsGrid = document.querySelector('.js-all-products-grid');
    if (productsGrid) {productsGrid.innerHTML = indexHTML;}
}

if (document.querySelector('.js-all-products-grid')) {renderProductsGrid();}


// updatae cart quantity section 
export function updateCartQuantity (productId) 
  {
    let cartQuantity=cart.length;
    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity
  }
//update cart quantity section ended



// add to cart section starts

  document.querySelectorAll('.product-action-btn-1').forEach((button)=>{button.addEventListener('click', ()=>{const productId = button.dataset.productId;
    addToCart(productId);updateCartQuantity(productId);
  });
});
// add to cart section ended









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

const productsGrid = document.querySelector(".js-all-products-grid");

if (productsGrid) {

  productsGrid.addEventListener("click", (event) => {

    const button = event.target.closest(".js-view-product");

    if (!button) {
      return;
    }

    const productId = Number(button.dataset.productId);

    const matchingProduct = products.find((product) => {
      return product.id === productId;
    });

    if (matchingProduct) {

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

if (closeModalBtn) {

  closeModalBtn.addEventListener("click", () => {
    quickViewModal.classList.remove("show");
  });

}

// end of the quick view modal section


















