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

export default slider;