/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
  // Calc
function calc() {
  const calcResult = document.querySelector('.calculating__result span');


  let sex, height, weight, age, ratio;

  if(localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if(localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      calcResult.textContent = '____';
      return;
    }
    if(sex === 'female') {
      calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotal();
  
  function getCalcStaticElementToLocalStorage(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      } 

      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  getCalcStaticElementToLocalStorage('.calculating__choose_big div', 'calculating__choose-item_active');
  getCalcStaticElementToLocalStorage('#gender div', 'calculating__choose-item_active');


  function getCalcStaticElement(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem, i) => {
      elem.addEventListener('click', (e) => {
        const target = e.target;

        if (target.getAttribute('data-ratio')) {
          ratio = +target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +target.getAttribute('data-ratio'));
        } else {
          sex = target.getAttribute('id');
          localStorage.setItem('sex', target.getAttribute('id'));
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        
        target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getCalcStaticElement('.calculating__choose_big div', 'calculating__choose-item_active');
  getCalcStaticElement('#gender div', 'calculating__choose-item_active');

  function getCalcDynamicElement (selector) {
    const elements = document.querySelector(selector);
    elements.addEventListener('input', (e) => {
      if (elements.value.match(/\D/g)) {
        elements.style.border = '1px solid red';
      } else {
        elements.style.border = 'none';
      }

      switch(selector) {
        case '#height':
          height = +elements.value;
          break;
        case '#weight':
          weight = +elements.value;
          break;
        case '#age':
          age = +elements.value;
          break;
      } 
      
      calcTotal();
    });

  }
  getCalcDynamicElement('#height');
  getCalcDynamicElement('#weight');
  getCalcDynamicElement('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cardMenu.js":
/*!********************************!*\
  !*** ./js/modules/cardMenu.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(parentSelector) {
 // карточки меню   

 class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.src = src;
      this.alt = alt;
      this.parent = document.querySelector(parentSelector);
      this.changer = 40;
      this.classes = classes;
      this.changeToUAH();
    
    }

    changeToUAH() {
      this.price = this.changer * +this.price;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML += `  
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;

        this.parent.append(element);
    }
  }

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getRequest)('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, parentSelector).render();
      });
    });

  // axios.get('http://localhost:3000/menu')
  //   .then(data => {
  //         data.data.forEach(({img, altimg, title, descr, price}) => {
  //           new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //         });
  //       });


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function form(modalSelector, timerModal) {
      //  Form request

  const forms = document.querySelectorAll('form'),
        modal = document.querySelector(modalSelector);

  forms.forEach(item => {
    bindPostData(item);
  });    



  function bindPostData (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const messege = {
        loading: 'img/modal/spinner.svg',
        succes: `Все успішно! Ми перетелефонуємо Вам пізніше`,
        error: 'Щось пішло не так, спробуйте пізніше'
      };

      let statusMessage = document.createElement('img');
      statusMessage.src = messege.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form); 

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
      .then((data) => {
        console.log(data);
        statusMessage.remove();
        formMessege(messege.succes);
      })
      .catch(() => {
        formMessege(messege.error);
        statusMessage.remove();
      })
      .finally(() => {
        form.reset();
      });

    }); 
  }

  function formMessege(messege) {
    const modalDialog = document.querySelector('.modal__dialog');
          
    modalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector, timerModal);

    let messegeDialog = document.createElement('div');
    messegeDialog.classList.add('modal__dialog', 'show');
    messegeDialog.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">×</div>
        <div class="modal__title">${messege}</div>
      </div>`;

      modal.append(messegeDialog);
      
    setTimeout(function() {
      messegeDialog.remove();
      modalDialog.classList.remove('hide');
      modalDialog.classList.add('show'); 
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);     
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, timerModalId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show', 'fade');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (timerModalId) {
    clearInterval(timerModalId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show', 'fade');
  document.body.style.overflow = '';

}


function modal(triger, modalSelector, timerModalId) {

  const btnConect = document.querySelectorAll(triger),
        modal = document.querySelector(modalSelector);

  btnConect.forEach(elem => {
    elem.addEventListener('click', () => openModal(modalSelector, timerModalId));
  });

  modal.addEventListener('click', (e) => { 
    if (e.target === modal || e.target.getAttribute('data-close') === '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
      openModal(modalSelector, timerModalId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({sliderItem, sliderWraper, prevButton, nextButton, totalNum, currentNum, mainImgWrapper, sliderList}) {
      // Slider

  let offset = 0,
  slideIndex = 1;

  const slides = document.querySelectorAll(sliderItem),
        slider = document.querySelector(sliderWraper),
        prev = document.querySelector(prevButton),
        next = document.querySelector(nextButton),
        total = document.querySelector(totalNum),
        current = document.querySelector(currentNum),
        sliderImgWrapper = document.querySelector(mainImgWrapper),
        sliderInner = document.querySelector(sliderList),
        width = window.getComputedStyle(sliderImgWrapper).width,
        widthReplece = +width.replace(/\D/g, '');


  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slider.style.position = 'relative';
  sliderInner.style.width = 100 * slides.length + '%';   
  sliderInner.style.transition = 'all .5s';
  sliderInner.style.display = 'flex';

  sliderImgWrapper.style.overflow = 'hidden';

  const carouselIndicators = document.createElement('ol'),
        dots = [];

  carouselIndicators.classList.add('carousel-indicators');

  slider.append(carouselIndicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i + 1);
    carouselIndicators.append(dot);

    dots.push(dot);

    if (i == 0) {
      dot.classList.add('dot__curent');
    }
  }

  slides.forEach(slide => {
    slide.style.width = width;
  });

  next.addEventListener('click', () => {
    if (offset == widthReplece * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += widthReplece;
    }
    sliderInner.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    zeroCurent();
    currentDot();
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = widthReplece * (slides.length -1);
    } else {
      offset -= widthReplece;
    }

    sliderInner.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    zeroCurent();
    currentDot();
  });

  function zeroCurent() {
  if (slides.length < 10) {
    current.textContent =  `0${slideIndex}`;
  } else {
    current.textContent =  slideIndex;
  }
  }

  function currentDot() {
    dots.forEach(elem => elem.style.opacity = '.5');
    dots[slideIndex-1].style.opacity = '1';
  }

  dots.forEach(elem => {
    elem.addEventListener('click', (e) => {
      const dataAtrib = e.target.getAttribute('data-slide-to');
      
      slideIndex = dataAtrib;
      offset = widthReplece * (dataAtrib - 1);

      sliderInner.style.transform = `translateX(-${offset}px)`;

      currentDot();
      zeroCurent();      
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabElement, tabsContent, tabParent, activeClas) {
    //Tabs

    const tabs = document.querySelectorAll(tabElement),
          tabContent = document.querySelectorAll(tabsContent),
          tabsParent = document.querySelector(tabParent);
  
    function hideTabContent() {
      tabContent.forEach((elem) => {
        elem.classList.add('hide');
        elem.classList.remove('show', 'fade');
      });
  
      tabs.forEach(elem => {
        elem.classList.remove(activeClas);
      });
    }
  
    function showTabContent(i = 0 ) {
      tabContent[i].classList.add('show', 'fade');
      tabContent[i].classList.remove('hide');
      
      tabs[i].classList.add(activeClas);
    }
  
    hideTabContent();
    showTabContent();
  
    tabsParent.addEventListener('click', (e) => {
      const target = e.target;
  
      if (target && target.classList.contains(tabElement.slice(1))) {
        tabs.forEach((elem, i) => {
          
          if (target === elem) {  
            hideTabContent();
            showTabContent(i);
          }
        });
      }
  
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(finalDate, selector) {

  function calcTime(endTime) {
    let day, hour, minute, second;
    const t = Date.parse(endTime) - Date.parse(new Date());
    if (t < 0) {
      day = 0;
      hour = 0;
      minute = 0;
      second = 0;
    } else {
      day = Math.floor( t / (1000 * 60 * 60 * 24) );
      hour = Math.floor( (t / (1000 * 60 * 60)) % 24 );
      minute = Math.floor( (t / (1000 * 60)) % 60 );
      second = Math.floor( (t / 1000) % 60 ); 
    }
          
    return {
      total: t,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
    };
  }

  function getZero(num) {
    if(num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function getTimeFromPage (selector, endTime) {
    const promotionTimer = document.querySelector(selector),
          days = promotionTimer.querySelector('#days'),
          hours = promotionTimer.querySelector('#hours'),
          minutes = promotionTimer.querySelector('#minutes'),
          seconds = promotionTimer.querySelector('#seconds'),
          intervelId = setInterval(setTimeToPage, 1000);

    setTimeToPage();    

    function setTimeToPage () {
      const resultCalcTime = calcTime(endTime);

      function renameTimerElem(data, d, h, m, s,) {
        const strDay = data.day + '',
              strHour = data.hour + '',
              strMin = data.minute + '',
              strSec = data.second + '',
              dayElem = d.nextSibling,
              hourElem = h.nextSibling,
              minElem = m.nextSibling,
              secElem = s.nextSibling;
        
        if (strDay != '11' && strDay[strDay.length -1] == '1') {
              dayElem.textContent = 'день';
            } else if (strDay == '12' || strDay == '13' || strDay == '14'){
              dayElem.textContent = 'дней';
            } else if (strDay[strDay.length -1] == '2' || strDay[strDay.length -1] == '3' ||
              strDay[strDay.length -1] == '4') {
                dayElem.textContent = 'дня';
            } else {
              dayElem.textContent = 'дней';
            }

        if (strHour != '11' && strHour[strHour.length -1] == '1' ) {
              hourElem.textContent = 'час';
            } else if (strHour == '12' || strHour == '13' || strHour == '14'){
              hourElem.textContent = 'часов';
            } else if (strHour[strHour.length -1] == '2' || strHour[strHour.length -1] == '3' ||
              strHour[strHour.length -1] == '4') {
                hourElem.textContent = 'часа';
    
            } else {
              hourElem.textContent = 'часов';
            }

        if (strMin != '11' && strMin[strMin.length -1] == '1') {
              minElem.textContent = 'минута';
            } else if (strMin == '12' || strMin == '13' || strMin == '14'){
              minElem.textContent = 'минут';
            } else if (strMin[strMin.length -1] == '2' || strMin[strMin.length -1] == '3' ||
              strMin[strMin.length -1] == '4') {
                minElem.textContent = 'минуты';
            } else {
              minElem.textContent = 'минут';
            }   
            
        if ( strSec != '11' && strSec[strSec.length -1] == '1') {
              secElem.textContent = 'секунда';
            } else if (strSec == '11' || strSec == '12' || strSec == '13' || strSec == '14') {
              secElem.textContent = 'секунд';
            } else if (strSec[strSec.length -1] == '2' || strSec[strSec.length -1] == '3' || 
              strSec[strSec.length -1] == '4') {
                secElem.textContent = 'секунды';
            } else {
              secElem.textContent = 'секунд';
            }
      }

      renameTimerElem(resultCalcTime, days, hours, minutes, seconds); 

      days.innerHTML = getZero(resultCalcTime.day);
      hours.innerHTML = getZero(resultCalcTime.hour);
      minutes.innerHTML = getZero(resultCalcTime.minute);
      seconds.innerHTML = getZero(resultCalcTime.second);
      
      if (resultCalcTime.total <= 0) {
        clearInterval(intervelId);
      }
    }
  }

  getTimeFromPage(selector, finalDate);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRequest": () => (/* binding */ getRequest),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const rel = await fetch(url, {
          method: 'POST',
          headers: {'Content-type':'application/json; charset=utf-8'},
          body: data,
        }
      ); 

    return await rel.json();
  };

  const getRequest = async (url) => {
    const rec = await fetch(url);

    if (rec.status !== 200) {
      throw new Error(`Oops we have problems with ${url}, status ${rec.status}`);
    }

    return await rec.json();
  };




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_cardMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cardMenu */ "./js/modules/cardMenu.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {

  const timerModal = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', timerModal), 5000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('2023.05.25', '.promotion__timer');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', timerModal);
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])('.modal', timerModal);
  (0,_modules_cardMenu__WEBPACK_IMPORTED_MODULE_5__["default"])('.menu .container');
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();      
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
    sliderItem: '.offer__slide',
    sliderWraper: '.offer__slider',
    prevButton: '.offer__slider-prev',
    nextButton: '.offer__slider-next',
    totalNum: '#total',
    currentNum: '#current',
    mainImgWrapper: '.offer__slider-wrapper',
    sliderList: '.offer__slider-inner'
  });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map