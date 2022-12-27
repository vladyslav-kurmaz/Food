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

export default calc;