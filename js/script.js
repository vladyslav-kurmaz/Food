//Tabs

window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader');

  function hideTabContent() {
    tabContent.forEach((elem) => {
      elem.classList.add('hide');
      elem.classList.remove('show', 'fade');
    });

    tabs.forEach(elem => {
      elem.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0 ) {
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');
    
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;
    console.dir(target);

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((elem, i) => {
        
        if (target === elem) {  
          hideTabContent();
          showTabContent(i);
        }
      });
    }

  });

  //Timer

  // Описаний сам таймер Зворотнього відліку

  // const finalDate = '2022.12.19';

  // function calcTime(endTime) {
  //   let day, hour, minute, second;
  //   const t = Date.parse(endTime) - Date.parse(new Date());

  //   day = Math.floor( t / (1000 * 60 * 60 * 24) );
  //   hour = Math.floor( (t / (1000 * 60 * 60)) % 24 );
  //   minute = Math.floor( (t / (1000 * 60)) % 60 );
  //   second = Math.floor( (t / 1000) % 60 );

  //   if (t < 0) {
  //     day = 0;
  //     hour = 0;
  //     minute = 0;
  //     second = 0;
  //   } else {
  //     day = Math.floor( t / (1000 * 60 * 60 * 24) );
  //     hour = Math.floor( (t / (1000 * 60 * 60)) % 24 );
  //     minute = Math.floor( (t / (1000 * 60)) % 60 );
  //     second = Math.floor( (t / 1000) % 60 );
      
  //   }
          
  //   return {
  //     total: t,
  //     day: day,
  //     hour: hour,
  //     minute: minute,
  //     second: second,
  //   };
  // }

  // function getZero(num) {
  //   if(num > 0 && num < 10) {
  //     return `0${num}`;
  //   } else {
  //     return num;
  //   }
  // }

  // function getTimeFromPage (selector, endTime) {
  //   const promotionTimer = document.querySelector(selector),
  //         days = promotionTimer.querySelector('#days'),
  //         hours = promotionTimer.querySelector('#hours'),
  //         minutes = promotionTimer.querySelector('#minutes'),
  //         seconds = promotionTimer.querySelector('#seconds'),
  //         intervelId = setInterval(setTimeToPage, 1000);

  //   setTimeToPage();    

  //   function setTimeToPage () {
  //     const resultCalcTime = calcTime(endTime);

  //     days.innerHTML = getZero(resultCalcTime.day);
  //     hours.innerHTML = getZero(resultCalcTime.hour);
  //     minutes.innerHTML = getZero(resultCalcTime.minute);
  //     seconds.innerHTML = getZero(resultCalcTime.second);
      
  //     if (resultCalcTime.total <= 0) {
  //       clearInterval(intervelId);
  //     }
  //   }
  // }

  // getTimeFromPage('.promotion__timer', finalDate);

// Тут я описав зміну назв під час зміни цифр 1 = секунда, 2 = секунди, 5 = секунд
// Якщо хочеш запустити то зміни цифри finalDate, адже там встановлений вже пройдений час

  const finalDate = '2022.11.19';

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
              dayElem.textContent = 'днів';
            } else if (strDay[strDay.length -1] == '2' || strDay[strDay.length -1] == '3' ||
              strDay[strDay.length -1] == '4') {
                dayElem.textContent = 'дня';
            } else {
              dayElem.textContent = 'днів';
            }

        if (strHour != '11' && strHour[strHour.length -1] == '1' ) {
              hourElem.textContent = 'година';
            } else if (strHour == '12' || strHour == '13' || strHour == '14'){
              hourElem.textContent = 'годин';
            } else if (strHour[strHour.length -1] == '2' || strHour[strHour.length -1] == '3' ||
              strHour[strHour.length -1] == '4') {
                hourElem.textContent = 'години';
    
            } else {
              hourElem.textContent = 'годин';
            }

        if (strMin != '11' && strMin[strMin.length -1] == '1') {
              minElem.textContent = 'хвилина';
            } else if (strMin == '12' || strMin == '13' || strMin == '14'){
              minElem.textContent = 'хвилин';
            } else if (strMin[strMin.length -1] == '2' || strMin[strMin.length -1] == '3' ||
              strMin[strMin.length -1] == '4') {
                minElem.textContent = 'хвилини';
            } else {
              minElem.textContent = 'хвилин';
            }   
            
        if ( strSec != '11' && strSec[strSec.length -1] == '1') {
              secElem.textContent = 'секунда';
            } else if (strSec == '11' || strSec == '12' || strSec == '13' || strSec == '14') {
              secElem.textContent = 'секунд';
            } else if (strSec[strSec.length -1] == '2' || strSec[strSec.length -1] == '3' || 
              strSec[strSec.length -1] == '4') {
                secElem.textContent = 'секунди';
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

  getTimeFromPage('.promotion__timer', finalDate);

  // Modal

  // Тут описано відкриття модального блоку

  const modal = document.querySelector('.modal'),
        btnConect = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelector('[data-close]');

  function openModal() {
    modal.classList.add('show', 'fade');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // clearInterval(timerModal);
  }

  btnConect.forEach(elem => {
    elem.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show', 'fade');
    document.body.style.overflow = '';
  }

  modal.addEventListener('click', (e) => { 
    if (e.target === modal || e.target.getAttribute('data-close') === '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const timerModal = setTimeout(openModal, 6000);

  function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

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
                    </div>`;

        this.parent.append(element);
    }
  }

  new MenuCard(
          '"img/tabs/vegy.jpg"',
          '"vegy"',
          '"Фітнес"', 
          `Меню "Фітнес" - це новий підхід до приготування страв: більше свіжих овочів та фруктів.
          Продукт активних та здорових людей. Це абсолютно новий продукт
          з оптимальною ціною та високою якістю!`,
            6,
            '.menu .container',
                       
 ).render();

  new MenuCard(
            '"img/tabs/elite.jpg"', 
            '"elite"',
            '“Преміум”', 
            `У меню “Преміум” ми використовуємо не тільки гарний дизайн упаковки,
            а й якісне виконання страв. Червона риба, морепродукти, фрукти
            - ресторанне меню без походу в ресторан!`,
            16,
            '.menu .container',
                    
  ).render();

  new MenuCard(
            '"img/tabs/post.jpg"', 
            '"post"',
            '"Пісне"', 
            `Меню "Пісне" - це ретельний підбір інгредієнтів: повна відсутність продуктів
            тваринного походження, молоко з мигдалю, вівса, кокосу чи гречки, правильна кількість
            білків за рахунок тофу та імпортних вегетаріанських стейків.`, 
            10.8, 
            '.menu .container',
            'menu__item',
                    
  ).render();


  // Forms request

  const forms = document.querySelectorAll('form');

  forms.forEach(item => {
    postRequest(item);
  });    

  function postRequest (form) {
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

      const request = new XMLHttpRequest();   
      request.open('POST', 'server.php');

      // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      const formData = new FormData(form);
      
      //для JSON, якщо потрібно на бек PHP, JSON файл відправлять тоді ця контрукція 
      // const object = {};
      // formData.forEach(function(value, key) {
      //   object[key] = value;
      // });

      // const json = JSON.stringify(object);
      // request.send(json);

      request.send(formData);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          statusMessage.remove();
          formMessege(messege.succes);
          form.reset();

        } else {
          formMessege(messege.error);
        }
      });
    }); 
  }

  function formMessege(messege) {
    const modalDialog = document.querySelector('.modal__dialog');
          
    modalDialog.classList.add('hide');
    openModal();

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
    }, 4000);
  }
});