import debounce from "lodash.debounce";

import { Warrning } from "./utils/pnotify";
import { fetchCountries } from "./services/fetchCountries";
import { refs } from "./utils/refs";
import countryListTamplate from "./templates/list-item.hbs";
import countryDescriptionTamplate from "./templates/country-description.hbs";

function buildCountryList(countries) {
  const markup = countries
    .map(country => countryListTamplate(country))
    .join("");
  refs.countryList.insertAdjacentHTML("beforeend", markup);
}

function buildCountryDescription(countries) {
  const markup = countries
    .map(country => countryDescriptionTamplate(country))
    .join("");
  refs.countryDesciption.insertAdjacentHTML("beforeend", markup);
}
function clearInfo() {
  refs.countryDesciption.innerHTML = "";
  refs.countryList.innerHTML = "";
  refs.input.innerHTML = "";
}
function getInputvalue(event) {
  event.preventDefault();
  const { target } = event;
  if (target.value !== "") {
    fetchCountries(target.value).then(data => {
      if (Array.from(data).length > 10) {
        return Warrning(
          "Too many matches found. Please enter a more specific query!"
        );
      }
      if (Array.from(data).length === 1) {
        clearInfo();
        buildCountryDescription(data);
        target.value = "";
      } else {
        clearInfo();
        buildCountryList(data);
        target.value = "";
      }
    });
  } else {
    Warrning("Not found. Please enter query! The fild can not be empty!");
  }
}

refs.input.addEventListener("input", debounce(getInputvalue, 500));
