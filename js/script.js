import  tabs from './modules/tabs';
import  timer from './modules/timer';
import  slider from './modules/slider';
import  modal from './modules/modal';
import  form from './modules/form';
import  cards from './modules/cardMenu';
import  calc from './modules/calc';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

  const timerModal = setTimeout(() => openModal('.modal', timerModal), 5000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader', 'tabheader__item_active');
  timer('2023.05.25', '.promotion__timer');
  modal('[data-modal]', '.modal', timerModal);
  form('.modal', timerModal);
  cards('.menu .container');
  calc();      
  slider({
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