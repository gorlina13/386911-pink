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

function makeSlider(selector, withTable = false) {
  let elem = document.querySelector(selector);

  if (elem !== null) {
    let slider = withTable ? new SliderWithTable(elem) : new Slider(elem);
    slider.setup();
  }
}

function work() {
  window.initMap = initMap;
  makeNav();
  makeSlider(`.slider--reviews`);
  makeSlider(`.slider--tariffs`, true);
}

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
