// 1. Взяти всі потрібні змінні
// 2. Написати функцію hideTabContent що скриватиме лишні елементи слайду
// 3. Написати функцію showTabContent що показуватиме перший слайд
// 4. Наначить оброку подій клік на батьківський елемент списку

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

      if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((elem, i) => {
          
          if (target === elem) {  
            hideTabContent();
            showTabContent(i);
          }
        });
      }

    });

});
