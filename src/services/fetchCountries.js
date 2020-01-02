const URL = "https://restcountries.eu/rest/v2/name/";
const fetchCountries = country =>
  fetch(URL + country)
    .then(data => data.json())
    //.then(console.log)
    .catch(err => console.log(err.message));

export { fetchCountries };
