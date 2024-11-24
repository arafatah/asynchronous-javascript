'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (response, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${response?.flags?.png}" />
      <div class="country__data">
        <h3 class="country__name">${response.name}</h3>
        <h4 class="country__region">${response.region}</h4>
        <p class="country__row"><span>👫</span>${(
          response.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${
          response?.languages?.[0].name
        }</p>
        <p class="country__row"><span>💰</span>${
          response?.currencies?.[0].name
        }</p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

/* const renderCountry = function (response, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${response?.flags?.png}" />
      <div class="country__data">
        <h3 class="country__name">${response.name}</h3>
        <h4 class="country__region">${response.type}</h4>
        <p class="country__row"><span>👫</span>${(
          response.osm_id / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${response?.osm_type}</p>
        <p class="country__row"><span>💰</span>${response?.addresstype}</p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
}; */

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
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

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     // Then method available on Promise.
//     // JSON method are also available on fetch.
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders?.[0];
//       // if (!neighbour) return;
//       // return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);

//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data, 'neighbour');
//       console.log(data);
//       const neighbour2 = data.borders?.[0];
//       if (!neighbour2) return;

//       // Country 3
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour2}`);
//     })
//     .then(response2 => response2.json())
//     .then(data2 => {
//       renderCountry(data2, 'neighbour2');
//     })
//     // .catch(err => alert(err.message));
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

/* const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => {
      renderCountry(data, 'neighbour');
      console.log(data);
      const neighbour2 = data.borders?.[0];
      if (!neighbour2) return;

      // Country 3
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour2}`,
        'Country not found'
      );
    })
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
  getCountryData('usa');
}); */

/* Asynchronous JavaScript 
Coding Challenge #1 
In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates. For that, you will use a second API to geocode coordinates. So in this challenge, you’ll use an API on your own for the first time 

Your tasks: 

PART 1 
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') and a longitude value ('lng') (these are GPS coordinates, examples are in test data below). 
2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format: 
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and 
promises to get the data. Do not use the 'getJSON' function we created, that is cheating 
3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: “You are in Berlin, Germany” 
4. Chain a .catch method to the end of the promise chain and log errors to the console 
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does not reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message 

PART 2 

6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using. 
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code) 30 
The Complete JavaScript Course 
Test data: 
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude) 
§ Coordinates 2: 19.037, 72.873 
§ Coordinates 3: -33.933, 18.474 
GOOD LUCK 
*/

/* const whereAmI = (lat, lng) => {
  fetch(
    `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=10&format=jsonv2`
  )
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with the API ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.address.city}, ${data.address.country}`);

      const country = data.address.country;

      return fetch(`https://restcountries.com/v2/name/${country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with the API ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0], 'neighbour2');
      console.log(data);
    })
    .catch(err => console.error(`${err.message} 🔥🔥`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474); */

/* console.log('Test start');
setTimeout(() => {
  console.log('0 sec timer');
}, 0);

Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
})
console.log('Test end');
 */

/* const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Draw is happening');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You Win');
    } else {
      reject(new Error('You lost your money'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisify setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('I waited for 2 sec');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 2 sec');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 3 sec');
    return wait(1);
  })
  .then(() => console.log('I waited for 4 second'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('abc')).catch(x => console.log(x));
 */

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position =>resolve(position),
    //   err => reject(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Promise based API
getPosition().then(pos => console.log(pos));

/* const whereAmI = () => {
  getPosition()
    .then(pos => {
      console.log(pos.coords);
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=10&format=jsonv2`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with the API ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.address.city}, ${data.address.country}`);

      const country = data.address.country;

      return fetch(`https://restcountries.com/v2/name/${country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with the API ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      console.log(data);
    })
    .catch(err => console.error(`${err.message} 🔥🔥`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  whereAmI();
}); */

/* Coding Challenge #2 
For this challenge you will actually have to watch the video! Then, build the image loading functionality that I just showed you on the screen. 
Your tasks: 
Tasks are not super-descriptive this time, so that you can figure out some stuff by yourself. Pretend you're working on your own 

PART 1 
1. Create a function 'createImage' which receives 'imgPath' as an input. 
This function returns a promise which creates a new image (use 
document.createElement('img')) and sets the .src attribute to the 
provided image path 
2. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image (listen for the'error' event), reject the promise 
3. If this part is too tricky for you, just watch the first part of the solution 

PART 2 
4. Consume the promise using .then and also add an error handler 
5. After the image has loaded, pause execution for 2 seconds using the 'wait' function we created earlier 
6. After the 2 seconds have passed, hide the current image (set display CSS property to 'none'), and load a second image (Hint: Use the image element returned by the 'createImage' promise to hide the current image. You will need a global variable for that 
7. After the second image has loaded, pause execution for 2 seconds again 
8. After the 2 seconds have passed, hide the current image 
Test data: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to “Fast 3G” in the dev tools Network tab, otherwise images load too fast 
GOOD LUCK 
 */
/* 
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imagesContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imagesContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.log(err));
 */

const getPosition2 = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition2();
    const { latitude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(
      `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=10&format=jsonv2`
    );
    if (!resGeo.ok) throw new Error(`Problem with the API ${resGeo.status}`);
    const dataGeo = await resGeo.json();
    console.log(dataGeo);
    console.log(
      `You are in ${dataGeo.address.city}, ${dataGeo.address.country}`
    );

    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.address.country}`
    );
    if (!res.ok) throw new Error(`Problem with the API ${res.status}`);
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);

    return `You are in ${dataGeo.address.city}, ${dataGeo.address.country}`;
  } catch (err) {
    console.error(`${err.message} 🔥🔥`);
    renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
  }
};

console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);
whereAmI().then(city => console.log(city));
console.log('2: Finished getting location');

// try {
//   let y = 1;
//   const x = 2;
//   x = 2;
// } catch {
//   alert(err.message);
// }

// Promise.Race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/tanzania`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
    getJSON(`https://restcountries.com/v2/name/italy`),
  ]);
  console.log(res[0]);
})();

// Only get one result - not an array
// Promise.rejected also can win the race. (No matter it's fulfilled or rejected.)

// Special timeout function
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
