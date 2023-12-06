const baseURL = "https://crudcrud.com/api/9aa73c6b1ea94cf281994cd638f4352b/productList"

const priceInput = document.getElementById('price');
const nameInput = document.getElementById('name');
const addBtn = document.getElementById('add');
const products = document.getElementById('prod');
const totalCost = document.getElementById('total');

let cost;

document.addEventListener("DOMContentLoaded", () => {
    getAllProducts();
})

async function getAllProducts () {
    try {
        const res = await axios.get(baseURL);
        console.log(res.data);
        products.innerText = "";
        cost = 0;
        res.data.forEach(item => {
            listItem(item);
            cost += +item.price;
        });

        totalCost.innerText = ""; // Clear the totalCost element
        totalCost.appendChild(document.createTextNode(`Total worth of the product(s): ${cost}`));
    }
    catch(e) {
        console.log(e);
    }
}

addBtn.addEventListener('click', async () => {
    try {
        const res = await axios.post(baseURL, {price : priceInput.value.trim(), name : nameInput.value.trim()})
        console.log("PRODUCT ADDED");
        getAllProducts();
    }
    catch (e) {
        console.log(e);
    }
})

function listItem(item) {
    const list = document.createElement('li');
    products.appendChild(list);

    const content = `${item.price} - ${item.name}`;
    const textNode = document.createTextNode(content);
    list.appendChild(textNode);

    const delButton = document.createElement('button');
    delButton.innerText = "Delete";
    list.appendChild(delButton)

    delButton.addEventListener('click', async () => {
        try {
            const res = await axios.delete(`${baseURL}/${item._id}`);
            console.log('ITEM DELETED');
            getAllProducts();
        }
        catch(error) {
            console.log(error);
        }
    })
}

