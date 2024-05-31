const imagesSection = document.querySelector(".images");
const breedsSection = document.querySelector(".breeds");
const voteSection = document.querySelector(".vote");

const radios = document.querySelector(".header__switch-model");

const modelToSectionMap = new Map();
modelToSectionMap.set("images", imagesSection);
modelToSectionMap.set("breeds", breedsSection);
modelToSectionMap.set("vote", voteSection);
//console.log("modelToSectionMap ===> ", modelToSectionMap);

const modelToEndpointMap = new Map();
// modelToEndpointMap.set(
//   "images",
//   "/images/search?limit=30&breed_ids=beng,kora,birm,tonk,sibe,sing,norw,nebe,jbob,mala&"
// );
//modelToEndpointMap.set('images', '/images/search?limit=10&breed_ids&');
modelToEndpointMap.set('images', '/images/search?limit=30&');
modelToEndpointMap.set("breeds", "/breeds?");

const apiUrl = "https://api.thecatapi.com/v1";
const apiKey =
  "live_MyLymXXGPoDA6Df7x8M9paTQTu5DVI6v5nHoTSGC0SojLHxM4QIkrFI5EKy7ubYi";

let currentModel = "images";
const currentDataArray = [];

radios.addEventListener("change", (event) => {
  const target = event.target;
  switch (target.id) {
    // I could use if else here since there are only two options,
    // but decided to use switch so that it is possible to add more models later
    case "images":
      currentModel = "images";
      imagesSection.style.display = "flex";
      breedsSection.style.display = "none";
      voteSection.style.display = "none";
      break;
    case "breeds":
      currentModel = "breeds";
      imagesSection.style.display = "none";
      breedsSection.style.display = "flex";
      voteSection.style.display = "none";

      break;
    case "vote":
      currentModel = "vote";
      imagesSection.style.display = "none";
      breedsSection.style.display = "none";
      voteSection.style.display = "flex";
      break;
  }


  generatePageElements(currentModel);
});

const generatePageElements = (model) => {
  // get current section's container
  const container = modelToSectionMap.get(model).querySelector('.section__container');
  // clear current data array
  currentDataArray.length = 0;
  // add Loading element/spinner
  showLoadingSpinner(container);
  // fetch data
  const requestUrl = `${apiUrl}${modelToEndpointMap.get(
    model
  )}api_key=${apiKey}`;
  fetchData(requestUrl, model, container);
}

async function fetchData(url, model, container) {
  console.log("url  ", url);
  console.log("model  ", model);

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then((data) => {
      //console.log("data  ", data);

      data.forEach((el) => {
        //console.log("el =====> ", el);
        appendDataToArray(el, model)
      });
      // create html elements and append them to the section container
      container.innerHTML = "";
      currentDataArray.forEach((el) =>
        container.appendChild(createDataCard(el, model))
      );
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

const showLoadingSpinner = (container) => {
  container.innerHTML = "";
  const spinnerDiv = document.createElement("div");
  spinnerDiv.classList.add("loading-spinner");
  let circle;
  for (let i = 0; i < 20; i++) {
    circle = document.createElement("div");
    circle.classList.add("circle");
    spinnerDiv.appendChild(circle);
  }
  container.appendChild(spinnerDiv);
}

const appendDataToArray = (data, model) => {
  switch (model) {
    case "images":
      const breed = data.breeds[0] ? data.breeds[0].name : "";
      const imageUrl = data.url;
      if (!imageUrl.endsWith(".gif")) {
        // do not include gifs
        currentDataArray.push({ 'breed': breed, 'imageUrl': imageUrl });
      }
      break;
    case 'breeds':
      const name = data.name;
      const bredFor = data.bred_for;
      const breedGroup = data.breed_group;
      const lifeSpan = data.life_span;
      const temperament = data.temperament;
      const origin = data.origin;
      const image = data.image && data.image.url ? data.image.url : '';
      //console.log("image ===> ", image);
      const weight = data.weight.imperial;
      const description = data.description;

      // const height = data.height.imperial;
      currentDataArray.push({
        'breed': name,
        'imageUrl': image,
        'bredFor': bredFor,
        'breedGroup': breedGroup,
        'lifeSpan': lifeSpan,
        'temperament': temperament,
        'origin': origin,
        'weight': weight,
        'description': description

        // 'height': height
      });
  }
}

const createDataCard = (data, model) => {
  const card = document.createElement('div');
  switch (model) {
    case 'images':
      card.classList.add("images__card");
      const img = document.createElement("img");
      img.src = data.imageUrl;
      img.alt = `Picture of ${data.breed ? data.breed : "a cat"}`;
      card.appendChild(img);
      const text = document.createElement("h3");
      text.innerText = data.breed ? `Breed: ${
         data.breed //: "no breed information"
      }`: "";
      card.appendChild(text);
      break;
    case 'breeds':
      card.classList.add('breeds__card');
      const breedImg = document.createElement('img');
      breedImg.src = data.imageUrl;
      //console.log("breedImg ====> ", breedImg);
      breedImg.alt = `Picture of ${data.breed}`;
      card.appendChild(breedImg);
      const breed = document.createElement("h4");
      breed.innerText = data.breed;
      card.appendChild(breed);
      if (data.bredFor) {
        const bredFor = document.createElement("p");
        bredFor.innerHTML = `<span>Bred for:</span> ${data.bredFor}`;
        card.appendChild(bredFor);
      }
      if (data.breedGroup) {
        const breedGroup = document.createElement("p");
        breedGroup.innerHTML = `<span>Breed group:</span> ${data.breedGroup}`;
        card.appendChild(breedGroup);
      }

      if (data.description) {
        const description = document.createElement("p");
        description.innerHTML = `<span>Description:</span> ${data.description}`;
        card.appendChild(description);
      }
      if (data.weight) {
        const weight = document.createElement("p");
        weight.innerHTML = `<span>Weight(lb):</span> ${data.weight}`;
        card.appendChild(weight);
      }
      // if (data.height) {
      //   const height = document.createElement('p');
      //   height.innerHTML = `<span>Height(in):</span> ${data.height}`;
      //   card.appendChild(height);
      // }
      if (data.lifeSpan) {
        const lifeSpan = document.createElement("p");
        lifeSpan.innerHTML = `<span>Life span:</span> ${data.lifeSpan}`;
        card.appendChild(lifeSpan);
      }
      if (data.temperament) {
        const temperament = document.createElement("p");
        temperament.innerHTML = `<span>Temperament:</span> ${data.temperament}`;
        card.appendChild(temperament);
      }
      if (data.origin) {
        const origin = document.createElement("p");
        origin.innerHTML = `<span>Origin:</span> ${data.origin}`;
        card.appendChild(origin);
      }
  }
  return card;
}
//
const API_URL = `https://api.thecatapi.com/v1/`;
const API_KEY = "DEMO-API-KEY";

let currentImageToVoteOn;

function showHistoricVotes()
{
  
  document.getElementById('vote-options').style.display = 'none';
  document.getElementById('vote-results').style.display = 'block';

  const url = `${API_URL}votes?limit=10&order=DESC`;

  fetch(url,{headers: {
    'x-api-key': API_KEY
  }})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
  
    data.map(function(voteData) {
 
    const imageData = voteData.image
 
    let image = document.createElement('img');
     //use the url from the image object
     image.src = imageData.url
            
    let gridCell = document.createElement('div');
    
      if(voteData.value<0)
      {
        gridCell.classList.add('red') 
      } else {
        gridCell.classList.add('green')
      }
      
    gridCell.classList.add('col-lg');

    gridCell.appendChild(image)
       
    document.getElementById('grid').appendChild(gridCell);
       
    });
  
  })
  .catch(function(error) {
     console.log(error);
  });
  
}

function showVoteOptions()
{
  document.getElementById("grid").innerHTML = '';
  
  document.getElementById('vote-options').style.display = 'block';
  document.getElementById('vote-results').style.display = 'none';
  
  showImageToVoteOn()
}

function showImageToVoteOn()
{
  
  const url = `${API_URL}images/search`;

  fetch(url,{headers: {
    'x-api-key': API_KEY
  }})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    currentImageToVoteOn = data[0];
    document.getElementById("image-to-vote-on").src= currentImageToVoteOn.url;
  });

}

function vote(value)
{
  
  const url = `${API_URL}votes/`;
  const body = {
    image_id:currentImageToVoteOn.id,
    value
  }
  fetch(url,{method:"POST",body:JSON.stringify(body),headers: {
    'content-type':"application/json",
    'x-api-key': API_KEY
  }})
  .then((response) => {
    showVoteOptions()
  })
}

showVoteOptions()



//
generatePageElements(currentModel);
