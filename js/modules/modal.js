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

export default modal;
export {openModal};
export {closeModal};