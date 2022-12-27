import { openModal } from "./modal";
import { closeModal } from "./modal";
import { postData } from "../services/services";

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

      postData('http://localhost:3000/requests', json)
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
    openModal(modalSelector, timerModal);

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
      closeModal(modalSelector);     
    }, 4000);
  }
}

export default form;