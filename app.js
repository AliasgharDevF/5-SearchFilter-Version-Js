const searchInput = document.querySelector('#search');
const section = document.querySelector('.section');
let allProducts = [];
const filters = {
    searchItems: '',
};

document.addEventListener('DOMContentLoaded', () => {
    axios
        .get('http://localhost:3000/items')
        .then((res) => {
            allProducts = res.data;
            renderProducts(res.data, filters);
        })
        .catch((err) => console.log(err));
});

function renderProducts(_products, _filters) {
    const filterProducts = _products.filter((p) => {
        return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
    });
    section.innerHTML = "";
    // render to DOM
    const cl = [...filterProducts];
    cl.forEach((item) => {
        console.log(item.title);
        const prodcutsDiv = document.createElement('div');
        prodcutsDiv.classList.add('box');
        prodcutsDiv.innerHTML = `
            <div class="box-img">
                <img src="${item.image}" alt="img">
            </div>
            <div class="box-inf">
                <p class="name">${item.title}</p>
                <p class="price">${item.price} $</p>
            </div>`;
        section.appendChild(prodcutsDiv);
    });
}
searchInput.addEventListener('input', (e) => {
    filters.searchItems = e.target.value;
    renderProducts(allProducts, filters);
});
