// Exporting module
console.log('Exporting module');
const shippingCost = 10;
export const cart = [];

export const getUsers = async function () {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    return Object.entries(data);
}

export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${product} has been added to cart`);

}
export {shippingCost};

export default function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${product} has been added to cart`);
}