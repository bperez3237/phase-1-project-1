const apiKey = '7846a756-8a6b-47d5-b42f-c56521b9893a'


document.addEventListener('DOMContentLoaded', () => {


    getBreeds()
    // getCategories()
    // getFavourites()
    getImages()
    // getVotes()
    


})


function handleSubmit(e) {
    e.preventDefault();
    
}

function getBreeds() {
    let container = document.getElementById('breeds-container')

    fetch('https://api.thecatapi.com/v1/breeds', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(breeds => breeds.forEach(breed => {
        let li = document.createElement('li')
        li.innerHTML = breed.name
        document.getElementById('breeds-container').appendChild(li)
    }))
}

function getCategories() {
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
    })
}

function getVotes() {
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
    })
}

function getFavourites() {
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
    })
}

function getImages() {
    fetch('https://api.thecatapi.com/v1/images/search?breed_id=beng', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(cats => {
        renderCat(cats[0])
        displayCatInfo(cats[0])
    })
}

function renderCat(catData) {
    let img = document.createElement('img');
    img.className = 'kitty'
    img.src = catData.url
    img.height = '100'

    document.getElementById('results').appendChild(img)
}



function displayCatInfo(catData) {
    let container = document.getElementById('results')
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

    container.appendChild(ul)
    container.appendChild(p)

    let favBttn = document.createElement('button')
    favBttn.textContent = 'Favorite!'
    console.log(favBttn)
    container.appendChild(favBttn)
}