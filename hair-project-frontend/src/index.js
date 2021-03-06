const apiService = new ApiService()
let main = document.getElementById('main')

const init = () => {
    bindEventListeners()
    renderProducts()
}

function bindEventListeners() {
    document.getElementById('show-product-form').addEventListener('click', displayCreateForm)
    document.getElementById('products').addEventListener('click', renderProducts)
    document.getElementById('ingredients').addEventListener('click', renderIngredients)
}


async function renderProducts() {
    clearForm()
    const products = await apiService.fetchProducts()
    main.innerHTML = "<h3><span style='font-family:cursive'>Products You've Created:</span></h3>"
    products.map(product => {
        const newProduct = new Product(product)
        main.innerHTML += newProduct.render()
    })
    clicksToProduct()

    let likeButton = document.querySelectorAll(".like") 
    likeButton.forEach(like => {
        like.addEventListener('click', clickButton)
    })

    let clicked = false;
    function clickButton(e){
        let button = e.target 

        if (!clicked) {
            clicked = true;
            button.innerHTML = `&#x2665`;
        } else {
            clicked = false;
            button.innerHTML = `&#x2661`;
        }
    }
}


function displayCreateForm(){
    let formDiv = document.querySelector("#product-form")
    let html = `
        <form>
            <h3><span style='font-family:cursive'>Create A New Product: </span></h3>
            <label>Name</label>
            <input type="text" id="name">
            <input type="submit">
            <hr>
            <br>
        </form>
    `
    formDiv.innerHTML = html
    document.querySelector("form").addEventListener(`submit`, createProduct)
}

function clearForm(){
    let formDiv = document.querySelector("#product-form")
    formDiv.innerHTML = ""
}

async function createProduct(e){
    e.preventDefault()
    let main = document.getElementById('main')
    let product = {
        name: e.target.querySelector("#name").value,
    }

    let data = await apiService.fetchCreateProduct(product)
    let newProduct = new Product(data)
    main.innerHTML += `"<em>Your New Product: <br/>${newProduct.render()} was created!</em>" `
    clicksToProduct()
    clearForm()
}


function clicksToProduct(){
    const products = document.querySelectorAll(".product-id")
    products.forEach(product => {
        product.addEventListener('click', displayProduct)
    })
}

async function displayProduct(e){   
    clearForm()      
    console.log(e.target)
    let id = e.target.dataset.id
    const data = await apiService.fetchProduct(id)
    const product = new Product(data)
    main.innerHTML = product.renderProduct()
    document.querySelector("#create-ingredient").addEventListener(`click`, displayCreateIngredientForm)
    document.querySelector("#delete-product").addEventListener(`click`, removeProduct)
    document.querySelectorAll(".product-ingredient").forEach(ingredient => {
        ingredient.addEventListener(`click`, displayIngredient)
    })
}

async function removeProduct(event){
    let id = event.target.dataset.id
    const data = await apiService.fetchRemoveProduct(id)
     .then(data => {
         renderProducts()
     })

}

async function renderIngredients() {
    clearForm()
    const ingredients = await apiService.fetchIngredients()
    main.innerHTML = "<h3><span style='font-family:cursive'>All Ingredients In Database:</span></h3>"
    ingredients.map(ingredient => {
        const newIngredient = new Ingredient(ingredient)
        main.innerHTML += newIngredient.render()
    })
    ingredientsClicksToLinks()
}


function ingredientsClicksToLinks(){
    const products = document.querySelectorAll("li a")
    products.forEach(product => {
        product.addEventListener('click', displayIngredient)
    })
}

async function displayIngredient(e){         
    clearForm()
    console.log(e.target)
    let id = e.target.dataset.id
    const data = await apiService.fetchIngredient(id)
    const ingredient = new Ingredient(data)
    main.innerHTML = ingredient.renderIngredient()
}

async function createIngredient(e){
    e.preventDefault()
    let main = document.getElementById('main')
    let ingredient = {
        name: e.target.querySelector("#name").value,
        description: e.target.querySelector("#description").value,
        product_id: e.target.querySelector("#product_id").value
    }

    let data = await apiService.fetchCreateIngredient(ingredient)
    let newIngredient = new Ingredient(data)
    main.innerHTML += newIngredient.render()
    ingredientsClicksToLinks()
    clearForm()
}

function displayCreateIngredientForm(){
    let formDiv = document.querySelector("#product-form")
    let productId = document.querySelector("#create-ingredient").dataset.id
    let html = `
        <form>
            <h3>Add An Ingredient: </h3>
            <label>Name</label>
            <input type="text" id="name"><br/>
            <label>Description</label>
            <input type="text" id="description"><br/>
            <input type="hidden" id="product_id" name="product_id" value="${productId}">
            <input type="submit">
        </form>
    `
    formDiv.innerHTML = html
    document.querySelector("form").addEventListener(`submit`, createIngredient)
}

init()
