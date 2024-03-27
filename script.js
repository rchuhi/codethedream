// Reg Chuhi
// March 2024
// This function fetches 10 images from the provided URL.

document.addEventListener("DOMContentLoaded", function() {
    fetchAllImages();
});

async function fetchAllImages() {
    try {
        const response = await fetch('https://api.thedogapi.com/v1/images/search?limit=10');
        const data = await response.json();
        displayAllImages(data);
    } catch (error) {
        console.error('Image not found:', error);
    }
}
// This function displays the 10 fetched images and loads then on the home page.
function displayAllImages(images) {
    const gallery = document.getElementById('allPics');

    images.forEach(image => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image');

        const img = document.createElement('img');
        img.src = image.url;

        imageDiv.appendChild(img);
        gallery.appendChild(imageDiv);

        
    });
}

// for the Breed page to get the Breed info, populate the dropdown, get the info and Image associated with the breed
    document.addEventListener("DOMContentLoaded", function() {
        fetchDogBreeds();
    });

    async function fetchDogBreeds() {
        try {
            const response = await fetch('https://api.thedogapi.com/v1/breeds'); 
            const data = await response.json();
            populateBreedsDropdown(data);
        } catch (error) {
            console.error('dog breeds not found:', error);
        }
    }

    function populateBreedsDropdown(data) {
        const breedSelect = document.getElementById('breedSelect');

        data.forEach(dogBreed => {
            const option = document.createElement('option');
            option.textContent = dogBreed.name;
            option.value = dogBreed.id;
            breedSelect.appendChild(option);
        });
    }

    async function fetchBreedInfo() {
        const breedSelect = document.getElementById('breedSelect');
        const breedId = breedSelect.value;

        if (!breedId) return;

        try {
            const response = await fetch(`https://api.thedogapi.com/v1/breeds/${breedId}`);
            const data = await response.json();
            displayBreedInfo(data);
            fetchBreedImage(breedId); 
        } catch (error) {
            console.error('Dog breeds not found:', error);
        }
    }

    async function fetchBreedImage(breedId) {
        try {
            const response = await fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}`);
            const data = await response.json();
            displayBreedImage(data);
        } catch (error) {
            console.error('Breed image not found:', error);
        }
    }

    function displayBreedInfo(data) {
        const breedInfoDiv = document.getElementById('breedInfo');
        breedInfoDiv.innerHTML = `
            <h3>${data.name}</h3>
            <p><strong>Temperament:</strong> ${data.temperament}</p>
            <p><strong>Life Span:</strong> ${data.life_span}</p>
        `;
    }

    function displayBreedImage(images) {
        const selectedImage = document.getElementById('selectedBreedImage');
        if (images && images.length > 0) {
            const imageUrl = images[0].url;
            selectedImage.innerHTML = `
                <h3>Breed Image</h3>
                <img src="${imageUrl}" alt="Breed Image">
            `;
        } else {
            selectedImage.innerHTML = '<h3>No Image Available</h3>';
        }
    }




