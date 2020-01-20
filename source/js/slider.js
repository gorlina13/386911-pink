'use strict';

(function () {
  class Slider {
    constructor(elem) {
      this.CONTAINER_CLASS_NAME_BASE = `slider__slides--show-`;
      this.INITIAL_SLIDEINDEX = 0;
      this.elem = elem;

      this.controls = Array.from(this.elem.querySelectorAll(`.slider__control`));
      this.buttons = this.elem.querySelectorAll(`.slider__button`);
      this.container = this.elem.querySelector(`.slider__slides`);
      this.focusableElemsWithin = this.container.querySelectorAll(`a[href], button`);

      if (this.focusableElemsWithin.length > 0) {
        this.slides = Array.from(this.container.querySelectorAll(`.slider__item`));
      }
    }

    setup() {
      this.syncSliderElems(this.INITIAL_SLIDEINDEX);
      this.currentSlideIndex = this.INITIAL_SLIDEINDEX;
      this.elem.addEventListener(`click`, this.onSliderClick.bind(this));
    }

    update(newIndex) {
      this.syncSliderElems(newIndex);
      this.currentSlideIndex = newIndex;
    }

    getClosestSlideIndex(elem) {
      let slide = elem.closest(`.slider__item`);

      return this.slides.indexOf(slide);
    }

    syncSliderElems(index) {
      let handleControls = () => {

        for (let control of this.controls) {
          control.classList.remove(`slider__control--current`);
        }

        this.controls[index].classList.add(`slider__control--current`);
      };

      let showSlide = () => {
        let classes = this.container.classList;

        for (let classItem of classes) {
          if (classItem.startsWith(this.CONTAINER_CLASS_NAME_BASE)) {
            classes.remove(classItem);
          }
        }

        classes.add(this.CONTAINER_CLASS_NAME_BASE + (index + 1));
      };

      let handleTabindex = () => {
        for (let elem of this.focusableElemsWithin) {
          let isShowed = this.getClosestSlideIndex(elem) === index;

          if (isShowed) {
            elem.removeAttribute(`tabindex`);
          } else {
            elem.setAttribute(`tabindex`, -1);
          }
        }
      };

      handleControls();
      showSlide();
      handleTabindex();
    }

    onSliderClick(evt) {
      let control = evt.target.closest(`.slider__control`);
      let button = evt.target.closest(`.slider__button`);

      if (control) {
        this.onControlClick(evt, control);
      }

      if (button) {
        this.onButtonClick(evt, button);
      }
    }

    onControlClick(evt, control) {
      evt.preventDefault();

      this.update(this.controls.indexOf(control));
    }

    onButtonClick(evt, button) {
      evt.preventDefault();

      let isPrev = button === this.buttons[0];

      let nextIndex = isPrev ? this.currentSlideIndex - 1 : this.currentSlideIndex + 1;

      if (this.controls[nextIndex]) {
        this.update(nextIndex);
      }
    }
  }

  class SliderWithTable extends Slider {
    constructor(elem, firstCellIndex = 1, cellIndexStep = 1) {
      super(elem);
      this.INITIAL_SLIDEINDEX = 1;
      this.firstCellIndex = firstCellIndex;
      this.cellIndexStep = cellIndexStep;
    }

    getClosestSlideIndex(elem) {
      let cell = elem.closest(`th, td`);

      if (!cell) {
        return null;
      } else {
        return Math.floor((cell.cellIndex - this.firstCellIndex) / this.cellIndexStep);
      }
    }
  }

  function makeSliders() {
    let reviewsElem = document.querySelector(`.slider--reviews`);
    let tariffsElem = document.querySelector(`.slider--tariffs`);

    if (reviewsElem) {
      let reviewsSlider = new Slider(reviewsElem);
      reviewsSlider.setup();
    }

    if (tariffsElem) {
      let tariffsSlider = new SliderWithTable(tariffsElem);
      tariffsSlider.setup();
    }
  }

  makeSliders();
})();
