'use strict';

(function () {
  class MainNav {
    constructor(nav, navToggle) {
      this.nav = nav;
      this.navToggle = navToggle;
    }

    open() {
      this.nav.classList.remove(`main-nav--closed`);
      this.nav.classList.add(`main-nav--opened`);
      this.navToggle.setAttribute(`aria-expanded`, true);
    }

    close() {
      this.nav.classList.remove(`main-nav--opened`);
      this.nav.classList.add(`main-nav--closed`);
      this.navToggle.setAttribute(`aria-expanded`, false);
    }

    setup() {
      let onNavToggleClick = () => {
        if (this.nav.classList.contains(`main-nav--closed`)) {
          this.open();
        } else {
          this.close();
        }
      };

      this.nav.classList.remove(`main-nav--nojs`);
      this.close();
      this.navToggle.addEventListener(`click`, onNavToggleClick);
    }
  }

  function makeNav() {
    let nav = document.querySelector(`.main-nav`);
    let navToggle = document.querySelector(`.main-nav__toggle`);

    if (nav && navToggle) {
      let mainNav = new MainNav(nav, navToggle);
      mainNav.setup();
    }
  }

  makeNav();
})();
