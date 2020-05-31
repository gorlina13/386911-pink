class Slider {
  constructor(elem) {
    this.CONTAINER_CLASS_NAME_BASE = `slider__slides--show-`;
    this.currentIndex = 0;
    this.elem = elem;

    this.controls = this.elem.querySelectorAll(`.slider__control`);
    this.buttons = this.elem.querySelectorAll(`.slider__button`);
    this.container = this.elem.querySelector(`.slider__slides`);
    this.focusableElemsWithin = this.container.querySelectorAll(`a[href], button`);
    this.slides = this.container.querySelectorAll(`.slider__item`);
  }

  setup() {
    this.syncSliderElems(this.currentIndex);
    this.elem.addEventListener(`click`, this.onSliderClick.bind(this));
  }

  update(newIndex) {
    this.syncSliderElems(newIndex);
    this.currentIndex = newIndex;
  }

  getClosestSlideIndex(elem) {
    let slide = elem.closest(`.slider__item`);

    return Array.prototype.indexOf.call(this.slides, slide);
  }

  syncSliderElems(index) {
    let changeControl = () => {
      for (let control of this.controls) {
        control.classList.remove(`slider__control--current`);
      }

      if (index < this.controls.length) {
        this.controls[index].classList.add(`slider__control--current`);
      }
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

    let setTabindex = () => {
      for (let elem of this.focusableElemsWithin) {
        let isShown = this.getClosestSlideIndex(elem) === index;

        if (isShown) {
          elem.removeAttribute(`tabindex`);
        } else {
          elem.setAttribute(`tabindex`, -1);
        }
      }
    };

    changeControl();
    showSlide();
    setTabindex();
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

    let index = Array.prototype.indexOf.call(this.controls, control);
    this.update(index);
  }

  onButtonClick(evt, button) {
    evt.preventDefault();

    let isPrev = button === this.buttons[0];

    let nextIndex = isPrev ? this.currentIndex - 1 : this.currentIndex + 1;

    if (nextIndex >= 0 && nextIndex < this.slides.length) {
      this.update(nextIndex);
    }
  }
}

class SliderWithTable extends Slider {
  constructor(elem, firstCellIndex = 1, cellIndexStep = 1) {
    super(elem);
    this.currentIndex = 1;
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

export {Slider, SliderWithTable};
