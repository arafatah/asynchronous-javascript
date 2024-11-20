'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

/////////////////////
/////////////////////////////
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

// Modern way fetching data from an API
const request = fetch(`https://restcountries.com/v2/name/portugal`);
console.log(request);

// In modern way get response by promise.
// What is promise?
// Promise an object that is used as placeholder for the future result of asynchronous operation.
// Promise is like a container for an asynchronously deliver value.
// Promise is A container for future value.

// TWO big advantages of promises.
// 1. We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results.
// 2. Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations: escaping callback hell.

// Pending > Settled (fulfilled or rejected)
// Fulfilled > Settled - Success! The result is available
// Rejected > Settled - Failure! An error is happened > User is offline or can't connect to the API server. > Network error.

// Promise is only settle once. So, Promise is either fulfilled or rejected. It can't be changed.
// ↡
// Consume Promise - To Consume need to build first.

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    // Then method available on Promise.
    // JSON method are also available on fetch.
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders?.[0];
      // if (!neighbour) return;
      // return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);

      const neighbour = data[0].borders?.[0];
      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      renderCountry(data, 'neighbour');
      console.log(data);
      const neighbour2 = data.borders?.[0];
      if (!neighbour2) return;

      // Country 3
      return fetch(`https://restcountries.com/v2/alpha/${neighbour2}`);
    })
    .then(response2 => response2.json())
    .then(data2 => {
      renderCountry(data2, 'neighbour2');
    })
    // .catch(err => alert(err.message));
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('germany');
});
