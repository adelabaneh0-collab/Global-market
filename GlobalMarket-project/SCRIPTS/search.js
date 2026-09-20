import { products, getProduct } from './data/products-data.js';
import { cart, addToCart } from './data/gm-cart.js';
import { updateCartQuantity } from './index.js';


const searchButton = document.querySelector('#searchBtn');
const searchDiv = document.querySelector('#hiddenSearchDiv');
const searchInput = document.querySelector('#searchInput');

const searchResultsOverlay = document.querySelector('#searchResultsOverlay');
const searchResultsGrid = document.querySelector('#searchResultsGrid');


// OPEN / CLOSE SEARCH

if (searchButton && searchDiv && searchInput) {

  searchButton.addEventListener('click', () => {searchDiv.classList.toggle('hidden');

    if (!searchDiv.classList.contains('hidden')) {searchInput.focus();} 

    else {searchInput.value = '';
      if (searchResultsOverlay) {searchResultsOverlay.classList.add('hidden');}
      if (searchResultsGrid) {searchResultsGrid.innerHTML = '';}

    }
  });


  // SEARCH PRODUCTS

  searchInput.addEventListener('input', () => {

    const searchText = searchInput.value.trim().toLowerCase();


    // If search box is empty

    if (searchText === '') {
      searchResultsOverlay.classList.add('hidden');
      searchResultsGrid.innerHTML = '';
      return;
    }


    // Find matching products

    const matchingProducts = products.filter((product) => {

      const productName = product.name.toLowerCase();
      const brandName = product.brandName.toLowerCase();
      const category = product.category.toLowerCase();

      return (
        productName.includes(searchText) ||
        brandName.includes(searchText) ||
        category.includes(searchText)
      );

    });


    // NO RESULTS

    if (matchingProducts.length === 0) {

      searchResultsOverlay.classList.remove('hidden');

      searchResultsGrid.innerHTML = `
        <div class="no-search-results">
          <p>Sorry, we found no matching product.</p>
        </div>
      `;

      return;
    }


    // SHOW RESULTS

    searchResultsOverlay.classList.remove('hidden');

    let searchResultsHTML = '';

    matchingProducts.forEach((product) => {

      searchResultsHTML += `
        <div class="product-card">

          <div class="product-image-wrap">

            <img
              src="${product.image}"
              class="products-img"
            >

            <div class="product-hover-buttons">

              <button
                class="product-action-btn-1 js-add-to-cart"
                data-product-id="${product.id}"
              >
                Add to Cart
              </button>

              <button
                class="product-action-btn-2 js-view-product"
                data-product-id="${product.id}"
              >
                View
              </button>

            </div>

          </div>

          <div class="product-info">

            <p class="product-brand">
              ${product.brandName}
            </p>

            <p class="product-name">
              ${product.name}
            </p>

            <p class="product-category">
              ${product.category}
            </p>

            <p class="product-price">
              $${(product.priceCents / 100).toFixed(2)}
            </p>

          </div>

        </div>
      `;

    });

    searchResultsGrid.innerHTML = searchResultsHTML;

  });

}


// ADD TO CART FROM SEARCH RESULTS

if (searchResultsGrid) {

  searchResultsGrid.addEventListener('click', (event) => {const button = event.target.closest('.js-add-to-cart');
    if (!button) {return;}

    const productId = button.dataset.productId;

    addToCart(productId);
    updateCartQuantity();
  });

}


// SEARCH QUICK VIEW MODAL

const quickViewModal = document.getElementById("quickViewModal");

const modalProductImage = document.getElementById("modalProductImage");
const modalBrandName = document.getElementById("modalBrandName");
const modalProductName = document.getElementById("modalProductName");
const modalProductCategory = document.getElementById("modalProductCategory");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalAddCartBtn = document.querySelector(".modal-add-cart-btn");


if (searchResultsGrid) {

  searchResultsGrid.addEventListener("click", (event) => {

    const button = event.target.closest(".js-view-product");

    if (!button) {
      return;
    }

    const productId = Number(button.dataset.productId);

    const matchingProduct = products.find((product) => {
      return product.id === productId;
    });

    if (matchingProduct) 
    {
      modalProductImage.src = matchingProduct.image;
      modalBrandName.textContent =matchingProduct.brandName;
      modalProductName.textContent =matchingProduct.name;
      modalProductCategory.textContent =matchingProduct.category;
      modalProductPrice.textContent =`$${(matchingProduct.priceCents / 100).toFixed(2)}`;
      modalAddCartBtn.dataset.productId = productId;
      quickViewModal.classList.add("show");
    }

  });

}


// CLOSE QUICK VIEW MODAL

const closeModalBtn = document.getElementById("closeModalBtn");
if (closeModalBtn && quickViewModal) {closeModalBtn.addEventListener("click", () => {quickViewModal.classList.remove("show");});}


/*
export function cartStorage ()
 {
  localStorage.removeItem('cart');
  console.log("your cart has been erased nigger.")
 }

const button=document.querySelector('.whoisyou');
button.addEventListener('click',()=>{cartStorage();})

*/

