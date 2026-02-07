import {places} from '../data/places.mjs';

console.log(places)

const showHere = document.querySelector("#photos-container")

if (!showHere) {
    console.error("photos-container element not found!")
}

function displayItems(places) {
    places.forEach(x => {
        const placecard = document.createElement('div')

        const placephoto = document.createElement('img')
        placephoto.src = `images/${x.photo}`
        placephoto.alt = x.name
        placecard.appendChild(placephoto)

        // title element
        const placetitle = document.createElement('h2')
        placetitle.innerText = x.name
        placecard.appendChild(placetitle)

        //address element
        const placeaddress = document.createElement("address")
        placeaddress.innerText = x.address
        placecard.appendChild(placeaddress)

        // description element
        const placedescription = document.createElement("p")
        placedescription.innerText = x.description
        placecard.appendChild(placedescription)


        showHere.appendChild(placecard)
    })
}

displayItems(places)