const BASE_URL = "http://localhost:3000"

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('show-product-form').addEventListener('click', displayCreateForm)
    document.getElementById('products').addEventListener('click', getProducts)
    document.getElementById('ingredients').addEventListener('click', getIngredients)

    getProducts()
})

function displayCreateForm(){
    let formDiv = document.querySelector("#product-form")
    let html = `
        <form>
            <label>Name</label>
            <input type="text" id="name">
            <input type="submit">
        </form>
    `
    formDiv.innerHTML = html
    document.querySelector("form").addEventListener(`submit`, createProduct)
}

function clearForm(){
    let formDiv = document.querySelector("#product-form")
    formDiv.innerHTML = ""
}

function createProduct(e){
    e.preventDefault()

    console.log(e)
}



function getProducts() {          
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetch(BASE_URL + '/products')   
    .then(res => res.json())        
    .then(products => {             
        products.map(product => {
        console.log(products)
        main.innerHTML += `
        <ul>
            <a href="#" data-id="${product.id}">${product.name}</a>
        <ul>
        `
        })
        clicksToLinks()
    })
}

function clicksToLinks(){
    const products = document.querySelectorAll("ul a")
    products.forEach(product => {
        product.addEventListener('click', displayProduct)
    })
}

function displayProduct(e){         
    console.log(e.target)
    let id = e.target.dataset.id
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetch(BASE_URL + `/products/${id}`)         
    .then(resp => resp.json())
    .then(product => {
        main.innerHTML = `
        <h3>${product.name}</h3>
        <ul>

        </ul>
        `
        product.ingredients.forEach(ingredient => {     
            const h4 = document.createElement('h4')
            h4.innerHTML = ingredient.name
            main.appendChild(h4)
        })
    })
}


function getIngredients() {          
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetch(BASE_URL + '/ingredients')   
    .then(res => res.json())        
    .then(ingredients => {             
        ingredients.map(ingredient => {
        console.log(ingredients)
        main.innerHTML += `
        <li>
            <a href="#" data-id="${ingredient.id}">${ingredient.name}</a>
        </li>
        `
        })
        ingredientsClicksToLinks()
    })
}

function ingredientsClicksToLinks(){
    const products = document.querySelectorAll("li a")
    products.forEach(product => {
        product.addEventListener('click', displayIngredients)
    })
}

function displayIngredients(e){        
    console.log(e.target)
    let id = e.target.dataset.id
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetch(BASE_URL + `/ingredients/${id}`)         
    .then(resp => resp.json())
    .then(ingredient => {
        main.innerHTML = `
        <h3>Here's a list of all the ingredients you've logged so far!</h3>

        <h4>${ingredient.name}</h4>
        <ul>
        <li>${ingredient.description}

        `
        // product.ingredients.forEach(ingredient => {     
        //     console.log(ingredient.name);
        // })
    })
}
