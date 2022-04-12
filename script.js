

const apiKey = '7846a756-8a6b-47d5-b42f-c56521b9893a'
const breedIds = {}






function renderCat(catData) {
    let img = document.createElement('img');
    img.className = 'kitty'
    img.src = catData.url
    img.height = '100'

    document.getElementById('results').appendChild(img)
}

function getImages(breedId) {
    const results = document.getElementById('results')
    fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(cats => {
        results.innerHTML = ''
        renderCat(cats[0])
        displayCatInfo(cats[0])
    })
}


function handleSearchSubmit(event) {
    let searchForm = document.getElementById('form')
    event.preventDefault()

    if (event.target.input.value in breedIds) {
        getImages(breedIds[event.target.input.value])
        searchForm.input.value = ''
    }
    else {
        event.target.input.value = 'BREED NOT FOUND'
        setTimeout(() => {
            searchForm.input.value = ''
        },3000)
    }
}

function handleGetCatSubmit(event) {
    let getCatForm = document.getElementById('form2')
    event.preventDefault()
         
    if (event.target.breedInput.value in breedIds) {
        alert(`CONGRATULATIONS!!! ${getCatForm.nameInput.value} the ${getCatForm.breedInput.value} is now yours!`)
        getCatForm.breedInput.value = ''
        getCatForm.nameInput.value = ''
    }
    else {
        event.target.breedInput.value = 'BREED NOT FOUND'
        setTimeout(() => {
            getCatForm.breedInput.value = ''
            getCatForm.nameInput.value = ''
        },3000)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let search = document.getElementById('search')
    let container = document.getElementById('breeds-container')
    let searchForm = document.getElementById('form')
    let getCatForm = document.getElementById('form2')

    fetch('https://api.thecatapi.com/v1/breeds', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(breeds => breeds.forEach(breed => {
        breedIds[breed.name] = breed.id
        let li = document.createElement('li')
        li.innerHTML = breed.name
        container.appendChild(li)
    }))


    searchForm.addEventListener('submit', (e) => handleSearchSubmit(e))
    getCatForm.addEventListener('submit', (e) => handleGetCatSubmit(e))

})

function checkFavorites(currentCat, currentFavorites,favoritesContainer,newFavorite) {
    let checker = true
    for (i=0;i<currentFavorites.length;i++) {
        if (currentFavorites[i].getElementsByTagName('p')[0].textContent === currentCat.breeds[0].name) {
            checker = checker && false
        }
    }
    if (currentFavorites.length != 3 && checker === true) {
        favoritesContainer.appendChild(newFavorite)
    }
    else if (currentFavorites.length != 3 && checker === false) {
        alert('AREADY IN FAVORITES')
    }
    else if (currentFavorites.length === 3 && checker === true) {
        favoritesContainer.removeChild(currentFavorites[0])
        favoritesContainer.appendChild(newFavorite)
    }
    else {
        alert('AREADY IN FAVORITES')
    }
}


function displayCatInfo(catData) {
    let container = document.getElementById('results')
    let favs = document.getElementById('favorites')

    let ul = document.createElement('ul')
    ul.innerHTML = `
    <h3>${catData.breeds[0].name}</h3>
    <li>Affection Level: ${catData.breeds[0].affection_level}</li>
    <li>Energy Level: ${catData.breeds[0].energy_level}</li>
    <li>Hairless: ${catData.breeds[0].hairless === 1}</li>
    <li>Intelligence Level: ${catData.breeds[0].intelligence}</li>
    <li>Life Span: ${catData.breeds[0].life_span} years</li>
    <li>Weight: ${catData.breeds[0].weight['imperial']} lbs</li><br>

    <li>The ${catData.breeds[0].name} is ${catData.breeds[0].temperament}</li>
    `
    let p = document.createElement('p')
    p.innerHTML = catData.breeds[0].description

    container.appendChild(ul)
    container.appendChild(p)

    let favBttn = document.createElement('button')
    favBttn.textContent = 'Favorite!'
    favBttn.addEventListener('click', () => {
        let favCard = document.createElement('div')
        let img = document.createElement('img')
        let name = document.createElement('p')
        img.src = catData.url
        img.height = '100'
        
        name.id = `${catData.breeds[0].id}`
        name.innerHTML = `${catData.breeds[0].name}`

        favCard.appendChild(img)
        favCard.appendChild(name)
        favCard.setAttribute('style','width:200px')


        checkFavorites(catData, favs.children, favs, favCard)
    })
    container.appendChild(favBttn)
}