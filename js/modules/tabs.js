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

export default tabs;