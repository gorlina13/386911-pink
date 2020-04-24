import 'picturefill';
import 'element-closest-polyfill';
import Nav from './modules/nav';
import {Slider, SliderWithTable} from './modules/slider';
import initMap from './modules/initMap';

function makeNav() {
  let navElem = document.querySelector(`.main-nav`);
  let navToggle = document.querySelector(`.main-nav__toggle`);

  if (navElem !== null && navToggle !== null) {
    let nav = new Nav(navElem, navToggle);
    nav.setup();
  }
}

function makeSliders() {
  let reviewsElem = document.querySelector(`.slider--reviews`);
  let tariffsElem = document.querySelector(`.slider--tariffs`);

  if (reviewsElem !== null) {
    let reviewsSlider = new Slider(reviewsElem);
    reviewsSlider.setup();
  }

  if (tariffsElem !== null) {
    let tariffsSlider = new SliderWithTable(tariffsElem);
    tariffsSlider.setup();
  }
}

function work() {
  window.initMap = initMap;
  makeNav();
  makeSliders();
}

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
