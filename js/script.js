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

  const finalDate = '2022.12.19';

  function calcTime(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()),
          day = Math.floor( t / (1000 * 60 * 60 * 24) ),
          hour = Math.floor( (t / (1000 * 60 * 60)) % 24 ),
          minute = Math.floor( (t / (1000 * 60)) % 60 ),
          second = Math.floor( (t / 1000) % 60 );
          
    return {
      total: t,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
    };
  }

  function getZero(num) {
    if(num > 0 && num < 10) {
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




});
