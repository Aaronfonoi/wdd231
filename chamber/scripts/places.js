import {places} from '../data/places.mjs';

console.log(places)

const showHere = document.querySelector("#photos-container")

if (!showHere) {
    console.error("photos-container element not found!")
}

function displayItems(places) {
    // create a single IntersectionObserver to lazy-load images
    let observer = null
    if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target
                    const ds = img.dataset.src
                    if (ds) img.src = ds
                    img.removeAttribute('data-src')
                    obs.unobserve(img)
                }
            })
        }, { rootMargin: '200px 0px' })
    }

    places.forEach(x => {
        const placecard = document.createElement('article')
        placecard.className = 'place-card'

        const figure = document.createElement('figure')

        const placephoto = document.createElement('img')
        const filename = x.photo_url || x.photo || x.photoUrl
        if (!filename) console.warn('No photo filename for', x.name)

        // tiny SVG placeholder to reserve a small lightweight src
        const placeholder = "data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'><rect width='100%' height='100%' fill='%23eaeaea'/></svg>"

        placephoto.src = placeholder
        placephoto.dataset.src = `images/${filename}`
        placephoto.alt = x.name || 'Place photo'
        placephoto.loading = 'lazy'
        placephoto.decoding = 'async'
        placephoto.style.objectFit = 'cover'
        placephoto.style.width = '100%'
        placephoto.style.height = 'auto'
        placephoto.addEventListener('error', () => console.warn('Image failed to load:', placephoto.dataset.src || placephoto.src))
        figure.appendChild(placephoto)

        if (observer) observer.observe(placephoto)
        else placephoto.src = `images/${filename}`

        placecard.appendChild(figure)

        // title element (kept as h2 for page structure)
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

        // Learn more button -> opens modal with details
        const learnBtn = document.createElement('button')
        learnBtn.type = 'button'
        learnBtn.className = 'learn-more'
        learnBtn.textContent = 'Learn more'
        learnBtn.setAttribute('aria-expanded', 'false')
        placecard.appendChild(learnBtn)

        // Modal population & open
        learnBtn.addEventListener('click', () => {
            const modal = document.getElementById('place-modal')
            if (!modal) {
                console.warn('Place modal element not found')
                return
            }

            const modalTitle = document.getElementById('modal-title')
            const modalImage = document.getElementById('modal-image')
            const modalAddress = document.getElementById('modal-address')
            const modalDescription = document.getElementById('modal-description')

            modalTitle.textContent = x.name || ''
            modalImage.src = `images/${filename}`
            modalImage.alt = x.name || 'Place image'
            modalAddress.textContent = x.address || ''
            modalDescription.textContent = x.description || ''

            // showDialog
            if (typeof modal.showModal === 'function') {
                modal.showModal()
            } else {
                // fallback: make visible
                modal.style.display = 'block'
            }

            // focus management
            const closeBtn = document.getElementById('modal-close')
            if (closeBtn) closeBtn.focus()

            // update aria-expanded
            learnBtn.setAttribute('aria-expanded', 'true')

            // close handler to reset aria-expanded
            const closeHandler = () => {
                learnBtn.setAttribute('aria-expanded', 'false')
                if (typeof modal.close === 'function') modal.close()
                else modal.style.display = 'none'
                closeBtn.removeEventListener('click', closeHandler)
            }

            if (closeBtn) closeBtn.addEventListener('click', closeHandler)
        })

        showHere.appendChild(placecard)
    })
}

displayItems(places)