const apiKey = '7846a756-8a6b-47d5-b42f-c56521b9893a'


document.addEventListener('DOMContentLoaded', () => {

    // getBreeds()
    // getCategories()
    // getFavourites()
    getImages()
    // getVotes()
    


})


function handleSubmit(e) {
    e.preventDefault();
    
}

function getBreeds() {
    let res;
    fetch('https://api.thecatapi.com/v1/breeds', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(cats => {
        console.log(cats)
        // renderCat(cats[0])
    })
}

function getCategories() {
    let res;
    fetch('https://api.thecatapi.com/v1/categories', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(cats => {
        console.log(cats)
        // renderCat(cats[0])
    })
}

function getVotes() {
    let res;
    fetch('https://api.thecatapi.com/v1/votes', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(cats => {
        console.log(cats)
        // renderCat(cats[0])
    })
}

function getFavourites() {
    let res;
    fetch('https://api.thecatapi.com/v1/favourites', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(cats => {
        console.log(cats)
        // renderCat(cats[0])
    })
}

function getImages() {
    let res;
    fetch('https://api.thecatapi.com/v1/images/search?breed_id=beng', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(cats => {
        console.log(cats[0])
        console.log(cats[0].breeds)
        renderCat(cats[0])
        displayCatInfo(cats[0])
    })
}

function renderCat(catData) {
    let img = document.createElement('img');
    img.className = 'kitty'
    img.src = catData.url
    // img.width = "500"
    img.height = '100'

    document.getElementById('results').appendChild(img)
}

function displayCatInfo(catData) {
    let ul = document.createElement('ul')
    ul.innerHTML = `
    <li>Affection Level: ${catData.breeds[0].affection_level}</li>
    <li>Energy Level: ${catData.breeds[0].energy_level}</li>
    <li>Hairless: ${catData.breeds[0].hairless === 1}</li>
    <li>Intelligence Level: ${catData.breeds[0].intelligence}</li>
    <li>Life Span: ${catData.breeds[0].life_span} years</li>
    `
    let p = document.createElement('p')
    p.innerHTML = catData.breeds[0].description

    document.getElementById('results').appendChild(ul)
    document.getElementById('results').appendChild(p)
}