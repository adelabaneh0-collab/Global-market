export const products = [
  {
    id:1,
    image: 'products-images-folder/six-product.avif',
    brandName: 'Sonique',
    name: 'Phantom Wireless Buds',
    priceCents: 19900,
    category: 'audio',
    newArrivals:true,
    allProducts:true,
    sale:true,
  },
  {
    id:2,
    image: 'products-images-folder/27-product.avif',
    brandName: 'Maison Noir',
    name: 'Lux Leather Weekender',
    priceCents: 69000,
    category: 'accessories',
    newArrivals:true,
    allProducts:true,
    sale:true,
  },
  {
    id:3,
    image: 'products-images-folder/one-product.avif',
    brandName: 'Nord Atelier',
    name: 'Arc Titanium Watch',
    priceCents: 420000,
    category: 'watches',
    newArrivals:true,
    allProducts:true,
    sale:false,
  },
  {
    id:4,
    image: 'products-images-folder/five-product.avif',
    brandName: 'Lumière',
    name: 'Shadow Wayfarer',
    priceCents: 195000,
    category: 'accessories',
    newArrivals:true,
    allProducts:true,
    sale:true,
  },
  {
    id:5,
    image: 'products-images-folder/13-product.avif',
    brandName: 'Chronovault',
    name: 'Noir Phantom Tourbillon',
    priceCents: 850000,
    category: 'watches',
    newArrivals:true,
    allProducts:true,
    sale:false,
  },
  {
    id:6,
    image: 'products-images-folder/two-product.avif',
    brandName: 'Nord Atelier',
    name: 'Apex Skeleton 38mm',
    priceCents: 375000,
    category: 'watches',
    newArrivals:true,
    allProducts:true,
    sale:true,
  },
  {
    id:7,
    image: 'products-images-folder/18-product.avif',
    brandName: 'Sonique',
    name: 'Horizon Over-Ear Wireless',
    priceCents: 44900,
    category: 'audio',
    newArrivals:false,
    allProducts:true,
    sale:false,
  },
  {
    id:8,
    image: 'products-images-folder/21-product.avif',
    brandName: 'Axiom Gear',
    name: 'Noir BT Speaker Pro',
    priceCents: 34000,
    category: 'audio',
    newArrivals:false,
    allProducts:true,
    sale:false,
  },
  {
    id:9,
    image: 'products-images-folder/22-product.avif',
    brandName: 'Kōdo',
    name: 'Velocity Elite Runner',
    priceCents: 28500,
    category: 'footwear',
    newArrivals:false,
    allProducts:true,
    sale:false,
  },
  {
    id:10,
    image: 'products-images-folder/24-product.avif',
    brandName: 'Stride Co.',
    name: 'Lunar High-Top',
    priceCents: 31000,
    category: 'footwear',
    newArrivals:false,
    allProducts:true,
    sale:false,
  },
  {
    id:11,
    image: 'products-images-folder/26-product.avif',
    brandName: 'Maison Noir',
    name: 'Slim Bifold Wallet',
    priceCents: 19500,
    category: 'accessories',
    newArrivals:false,
    allProducts:true,
    sale:false,
  },
  {
    id:12,
    image: 'products-images-folder/29-product.avif',
    brandName: 'Lumière',
    name: 'Gradient Aviator Shades',
    priceCents: 32000,
    category: 'accessories',
    newArrivals:false,
    allProducts:true,
    sale:false,
  },
  {
    id:13,
    image: 'products-images-folder/28-product.avif',
    brandName: 'Axiom Gear',
    name: 'Titanium Braided Bracelet',
    priceCents: 16500,
    category: 'accessories',
    newArrivals:false,
    allProducts:true,
    sale:false,
  },
];
export function getProduct (productId) {
  let matchingProduct;
  products.forEach((product) => {if (product.id === productId) {matchingProduct = product;}})
  return matchingProduct;
}

















