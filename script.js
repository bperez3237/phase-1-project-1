const apiKey = '7846a756-8a6b-47d5-b42f-c56521b9893a'


document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('breeds-container')
    let form = document.getElementById('form')
    let getCatForm = document.getElementById('get-cat')

    const breedIds = {}

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
        document.getElementById('breeds-container').appendChild(li)
    }))


    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (e.target.input.value in breedIds) {
            getImages(breedIds[e.target.input.value])
            form.input.value = ''
        }
        else {
            e.target.input.value = 'BREED NOT FOUND'
            setTimeout(() => {
                form.input.value = ''
            },3000)
        }
    })

    getCatForm.addEventListener('submit', (e) => {
        e.preventDefault()
        if (e.target.input.value in breedIds) {
            getImages(breedIds[e.target.input.value])
            form.input.value = ''
        }
        else {
            e.target.input.value = 'BREED NOT FOUND'
            setTimeout(() => {
                form.input.value = ''
            },3000)
        }
    })

})


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


function renderCat(catData) {
    let img = document.createElement('img');
    img.className = 'kitty'
    img.src = catData.url
    img.height = '100'

    document.getElementById('results').appendChild(img)
}

function checkIfFavd() {

}

function displayCatInfo(catData) {
    let container = document.getElementById('results')
    let favs = document.getElementById('favorites')

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

        if (favs.children.length == 3) {
            favs.removeChild(favs.children[0])
            favs.appendChild(favCard)
        }
        else {
            favs.appendChild(favCard)
        }

        console.log(favs.children[0])


    })

    container.appendChild(favBttn)
}