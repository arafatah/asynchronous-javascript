'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Very basic XMLHttpRequest (Old School)
/* const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [response] = JSON.parse(this.responseText);
    console.log(response);

    const html = `
        <article class="country">
          <img class="country__img" src="${response.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${response.name}</h3>
            <h4 class="country__region">${response.region}</h4>
            <p class="country__row"><span>👫</span>${(
              response.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${
              response.languages[0].name
            }</p>
            <p class="country__row"><span>💰</span>${
              response.currencies[0].name
            }</p>
          </div>
        </article>
      `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('usa');
// getCountryData('ind')
// getCountryData('ind')
 */

const renderCountry = function (response, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${response.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${response.name}</h3>
        <h4 class="country__region">${response.region}</h4>
        <p class="country__row"><span>👫</span>${(
          response.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${response.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${
          response.currencies[0].name
        }</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

/* const getCountryAndNeighbour = function (country) {
  // AJAX Call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [response] = JSON.parse(this.responseText);
    console.log(response);

    // Render Country
    renderCountry(response);

    //Get Neighbour Country 1
    const neighbour = response.borders?.[1]; // optional chaining

    if (!neighbour) return;

    // AJAX Call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const response2 = JSON.parse(this.responseText);
      console.log(response2);

      renderCountry(response2, 'neighbour');

      // Get Neighbour country 2 - Neighbour of Neighbour - Callback Hell
      const neighbour2 = response2.borders?.[0];
      //   console.log(neighbour2);

      if (!neighbour2) return;
      const request3 = new XMLHttpRequest();
      request3.open('GET', `https://restcountries.com/v2/alpha/${neighbour2}`);
      request3.send();

      request3.addEventListener('load', function () {
        const response3 = JSON.parse(this.responseText);
        console.log(response3);

        renderCountry(response3, 'neighbour2');
      });
    });
  });
};

// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa');
 */

/*
// We used to do like this  
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${country}`);
request.send(); */

