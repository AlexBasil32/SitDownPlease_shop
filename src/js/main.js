import Choices from 'choices.js';
import Swiper from 'swiper/bundle';
import noUiSlider from 'nouislider';
import mask from './phone-mask';

document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const choices = new Choices('[data-trigger]', {
    searchEnabled: false,
    itemSelectText: ''
  });

  const selectchoices = new Choices('#header-bottom__select', {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: ''
  });

  const swiperPromo = new Swiper('.swiper-container.promo__swiper', {
    direction: 'horizontal',
    slidesPerGroup: 1,
    slidesPerColumn: 1,
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

    autoplay: {
      delay: 3000,
    }
  });

  const offersSwiper = new Swiper('.swiper-container.special-offers__swiper', {
    direction: 'horizontal',
    slidesPerColumn: 1,
    slidesPerView: 'auto',
    spaceBetween: 32,

    navigation: {
      nextEl: '.special-offers__button-next',
      prevEl: '.special-offers__button-prev',
    },

    breakpoints: {
      320: {
        slidesPerGroup: 1,
        spaceBetween: 12,
      },
      570: {
        slidesPerGroup: 2,
      },
      1025: {
        slidesPerGroup: 3,
      }
    }
  });

  const usefulSwiper = new Swiper('.swiper-container.useful__swiper', {
    direction: 'horizontal',
    slidesPerColumn: 1,
    slidesPerView: 'auto',
    spaceBetween: 32,

    navigation: {
      nextEl: '.useful__button-next',
      prevEl: '.useful__button-prev',
    },

    breakpoints: {
      320: {
        slidesPerGroup: 1,
        spaceBetween: 16
      },
      570: {
        slidesPerGroup: 2,
        spaceBetween: 32
      },
      1023: {
        slidesPerGroup: 3
      }
    }
  });

  const catalogSwiper = new Swiper('.swiper-container.catalog-products-field', {
    direction: 'horizontal',
    slidesPerColumnFill: 'row',

    breakpoints: {
      1: {
        slidesPerGroup: 2,
        slidesPerColumn: 3,
        spaceBetween: 16,
        slidesPerView: 2
      },

      767: {
        slidesPerGroup: 2,
        slidesPerColumn: 3,
        spaceBetween: 32,
        slidesPerView: 2
      },

      1023: {
        slidesPerGroup: 3,
        slidesPerColumn: 3,
        slidesPerView: 3,
        spaceBetween: 32
      }
    },

    pagination: {
      el: '.catalog-pagination.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });

  const secondaryPicturesSlider = new Swiper('.swiper-container.secondary-pictures-slider', {
    direction: 'horizontal',
    slidesPerGroup: 1,
    slidesPerColumn: 1,
    slidesPerView: 'auto',
    spaceBetween: 40,

    breakpoints: {
      300: {
        slidesPerGroup: 2,
      },

      500: {
        slidesPerGroup: 1,
      }
    }
  });

  const productSwiper = new Swiper('.swiper-container.product-slider', {
    direction: 'horizontal',

    breakpoints: {
      100: {
        slidesPerGroup: 2,
        slidesPerColumn: 1,
        slidesPerView: 'auto',
        spaceBetween: 16,
      },

      767: {
        slidesPerGroup: 2,
        slidesPerColumn: 1,
        slidesPerView: 'auto',
        spaceBetween: 32,
      }
    },

    navigation: {
      nextEl: '.product-button-next',
      prevEl: '.product-button-prev',
    },
  });

  const modalSwiperThumbs = new Swiper('.swiper-container.slider-thumbs', {
    direction: 'horizontal',

    breakpoints: {
      319: {
        spaceBetween: 63,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },

      400: {
        spaceBetween: 78,
        slidesPerView: 2,
        slidesPerGroup: 1,
      },
      769: {
        spaceBetween: 78,
        slidesPerView: 3,
        slidesPerGroup: 1,
      },

      1230: {
        spaceBetween: 78,
        slidesPerView: 4,
        slidesPerGroup: 1,
      }
    },

    navigation: {
      nextEl: '.modal-slider__thumbs-next',
      prevEl: '.modal-slider__thumbs-prev',
    },
  });

  const modalSwiper = new Swiper('.swiper-container.modal-slider__inner', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1,
    slidesPerGroup: 1,

    thumbs: {
      swiper: modalSwiperThumbs,
    },
  });

  // burger

  const burger = document.querySelector('.burger');
  const hederNav = document.querySelector('.header-nav');


  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('burger--active');
      hederNav.classList.toggle('active');
    });
  }

  // rating cards

  const productCards = document.querySelectorAll('.product-list__item');
  const raitingBtn = document.querySelector('.rating-btn');

  if (raitingBtn) {
    raitingBtn.addEventListener('click', () => {
      if (!raitingBtn.classList.contains('active')) {
        productCards.forEach(el => {
          if (el.classList.contains('display-none')) {
            el.classList.remove('display-none');
            el.classList.add('display-block');
          } else if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
            el.classList.add('shown');
          }
        });
        raitingBtn.textContent = 'Свернуть';
        raitingBtn.classList.add('active');
      } else {
        productCards.forEach(el => {
          if (el.classList.contains('display-block')) {
            el.classList.remove('display-block');
            el.classList.add('display-none');
          } else if (el.classList.contains('shown')) {
            el.classList.remove('shown');
            el.classList.add('hidden');
          }
        });
        raitingBtn.textContent = 'Смотреть больше товаров';
        raitingBtn.classList.remove('active');
      }
    });
  }

  // range slider

  const rangeSlider = document.querySelector('.filter__range');
  const rangeInputs = document.querySelectorAll('.input-number');

  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [2000, 150000],
      connect: true,
      step: 2000,
      keyboardSupport: true,
      range: {
        'min': [2000],
        'max': [150000]
      }
    });

    rangeSlider.noUiSlider.on('update', (values, handle) => {
      rangeInputs[handle].value = Math.round(values[handle]);
    });

    const setRangeSlider = (index, value) => {
      let arr = [null, null];
      arr[index] = value;

      rangeSlider.noUiSlider.set(arr);
    };

    rangeInputs.forEach((item, index) => {
      item.addEventListener('change', (e) => {
        setRangeSlider(index, e.currentTarget.value);
      });
    });
  }

  const handles = document.querySelectorAll('.noUi-handle');
  const noUiLine = document.querySelector('.noUi-connect');

  handles.forEach(el => {
    el.addEventListener('focus', () => {

      noUiLine.style.background = '#7033ac';
    });
  });

  handles.forEach((el) => {
    el.addEventListener('blur', () => {

      noUiLine.style.background = '#a65cf0';
    });
  });

  // scroll

  const disableScroll = () => {
    const scrollWidth = window.innerWidth - document.body.clientWidth + 'px';
    body.style.overflow = 'hidden';
    modalFixed.forEach(el => {
      el.paddingRight = scrollWidth;
    });
    body.style.paddingRight = scrollWidth;
  };

  const anableScroll = () => {
    body.style.overflow = '';
    modalFixed.forEach(el => {
      el.paddingRight = 0;
    });
    body.style.paddingRight = 0;
  };

  // forms

  const inputName = document.querySelector('.input-name');
  const nameAlert = document.querySelector('.name-alert');
  const phoneInput = document.querySelector('.phone-input');
  const feedbackForm = document.querySelector('.feedback__form');

  if (inputName) {
    inputName.addEventListener('input', () => {
      if (inputName.value.match(/\w/g)) {
        nameAlert.style.color = '#ff6972';
        inputName.classList.add('alert');
      } else {
        nameAlert.style.color = 'transparent';
        inputName.classList.remove('alert');
      }
    });
  }

  mask('.phone-input');

  const inputMail = document.querySelector('.feedback__mail'),
    mailAlert = document.querySelector('.mail-alert');

  function validateEmail(email) {
    const pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    return pattern.test(email);
  }

  if (inputMail) {
    inputMail.addEventListener('input', function () {
      if (validateEmail(inputMail.value)) {
        mailAlert.style.color = 'transparent';
        inputMail.classList.remove('alert');
      } else {
        mailAlert.style.color = '#ff6972';
        inputMail.classList.add('alert');
      }
    });

    inputMail.addEventListener('blur', () => {
      if (inputMail.value == '') {
        mailAlert.style.color = 'transparent';
        inputMail.classList.remove('alert');
      }
    });
  }

  const agreementCheckbox = document.getElementById('agreement');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (agreementCheckbox && agreementCheckbox.checked == true) {
        modalField.classList.add('active');
        disableScroll();
        document.querySelector('.modal__thank-text')
          .textContent = 'Спасибо, мы вам перезвоним!';
        feedbackForm.reset();
        setTimeout(() => {
          modalField.classList.remove('active');
          anableScroll();
        }, 2000);
      } else {
        modalField.classList.add('active');
        disableScroll();
        document.querySelector('.modal__thank-text')
          .textContent = 'Ознакомтесь с пользовательским соглашением';
      }
    });
  }

  // filters

  const filterOpen = document.querySelectorAll('.filter__open-btn');
  const filterDropdown = document.querySelectorAll('.tablet-filter-inner');

  filterOpen.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      item.classList.toggle('active');
      filterDropdown[i].classList.toggle('active');
    });
  });

  const checkboxIinputs = document.querySelectorAll('.filter-checkbox');
  const checkboxCost = document.querySelectorAll('.checkbox-cost');

  const openHiddenFilters = (btnSelector, hiddenLabel, string) => {
    const button = document.querySelectorAll(btnSelector);
    const hiddenCheckboxes = document.querySelectorAll(hiddenLabel);
    if (button) {
      button.forEach(element => {
        element.addEventListener('click', (e) => {
          e.preventDefault();
          element.classList.toggle('active');
          if (element.classList.contains('active')) {
            element.textContent = 'Свернуть';
          } else {
            element.textContent = string;
          }
          let toggleSelector = hiddenLabel.slice(1);
          hiddenCheckboxes.forEach(item => {
            item.classList.toggle(toggleSelector);
          });
        });
      });
    }
  };

  openHiddenFilters('.filter__category-btn', '.filter-category-hidden', '+ еще 12');
  openHiddenFilters('.filter__color-btn', '.filter-color-hidden', '+ еще 7');

  checkboxCost.forEach(item => {
    item.addEventListener('change', () => {
      const inputValue = item.value;
      const parentEl = document.querySelector('.bone-color');
      const el = document.querySelector('.bone-color> span');
      el.innerHTML =
        `До ${inputValue}`;
      parentEl.classList.remove('hidden');
      item.value = '';
    });
  });

  checkboxIinputs.forEach(item => {
    item.addEventListener('change', () => {
      let data = item.dataset.filter;
      if (item.checked == true) {
        catalogOptionBtn.forEach(item => {
          if (item.dataset.option == data) {
            item.parentElement.classList.remove('hidden');
          }
        });
      } else {
        catalogOptionBtn.forEach(item => {
          if (item.dataset.option == data) {
            item.parentElement.classList.add('hidden');
          }
        });
      }
    });
  });

  const catalogOptionBtn = document.querySelectorAll('.option__button'),
    filterCheckbox = document.querySelectorAll('.filter-checkbox');


  catalogOptionBtn.forEach(item => {
    item.addEventListener('click', (e) => {
      let target = e.currentTarget;
      let data = target.dataset.option;
      item.parentElement.classList.add('hidden');
      filterCheckbox.forEach(item => {
        if (item.dataset.filter == data) {
          item.checked = false;
        }
      });
    });
  });

  //tabs

  const slideBtns = document.querySelectorAll('.secondary-picture-btn'),
    mainPictures = document.querySelectorAll('.product__main-picture');

  slideBtns.forEach(element => {
    element.addEventListener('click', (e) => {
      let target = e.currentTarget;
      let data = target.dataset.secondary;
      mainPictures.forEach(item => {
        item.classList.add('hidden');
        if (item.dataset.main == data) {
          item.classList.remove('hidden');
        }
      });
    });
  });

  // modal

  const modalForm = document.querySelector('.modal__form');
  const modalThank = document.createElement('div');
  const modalAgreement = document.createElement('div');
  const modalWindow = document.querySelector('.modal');
  const modalInner = document.querySelector('.modal__inner');
  const productBtn = document.querySelector('.product__btn');
  const modalField = document.querySelector('.modal-field');
  const body = document.querySelector('body');
  const modalCloseBtn = document.querySelector('.modal__close-btn');
  const productImg = document.querySelector('.product__pictures-main');
  const modalSlider = document.querySelector('.modal-slider');
  const modalSliderCloseBtn = document.querySelector('.modal-slider__btn');
  const modalFixed = document.querySelectorAll('.fixed');

  if (productImg) {
    productImg.addEventListener('click', () => {
      modalSlider.classList.toggle('hidden');
      disableScroll();
    });
  }

  if (modalSliderCloseBtn) {
    modalSliderCloseBtn.addEventListener('click', () => {
      modalSlider.classList.toggle('hidden');
      anableScroll();
    });
  }

  if (modalSlider) {
    modalSlider.addEventListener('click', (e) => {
      const target = e.target;
      if (target == modalSlider) {
        modalSlider.classList.toggle('hidden');
        anableScroll();
      }
    });
  }


  if (productBtn) {
    productBtn.addEventListener('click', () => {
      modalField.classList.add('active');
      disableScroll();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalField.classList.remove('active');
      anableScroll();
    });
  }

  if (modalField) {
    modalField.addEventListener('click', (e) => {
      if (e.target == modalField) {
        modalField.classList.remove('active');
        anableScroll();
      }
    });
  }

  modalThank.classList.add('modal__thank');
  modalThank.innerHTML =
    `<div class="modal__thank-img">
      <img src="./img/svg/mapIcon.svg">
    </div>
    <div class="modal__thank-text">Спасибо, мы вам перезвоним!</div>`;

  modalAgreement.classList.add('modal__thank');
  modalAgreement.innerHTML =
    `<div class="modal__thank-img">
      <img src="./img/svg/mapIcon.svg">
    </div>
    <div class="modal__thank-text">Ознакомтесь с  пользовательским соглашением</div>`;

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (agreementCheckbox && agreementCheckbox.checked == true) {
        modalWindow.prepend(modalThank);
        modalWindow.classList.add('thank');
        modalInner.style.display = 'none';

        setTimeout(() => {
          modalThank.remove();
          modalWindow.classList.remove('thank');
          modalInner.style.display = 'block';
          modalForm.reset();
          modalField.classList.remove('active');
          anableScroll();
        }, 2000);
      } else {
        modalWindow.prepend(modalAgreement);
        modalWindow.classList.add('agreement');
        modalInner.style.display = 'none';

        setTimeout(() => {
          modalAgreement.remove();
          modalWindow.classList.remove('agreement');
          modalInner.style.display = 'block';
        }, 5000);
      }
    });
  }

  const map = document.getElementById('map');

  if (map) {
    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
        center: [55.75426417229882, 37.62732507131952],
        zoom: 14,
      }, {
        searchControlProvider: 'yandex#search'
      }),
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemarkWithContent = new ymaps.Placemark([55.752831393462664, 37.63848494650637], {
          balloonContent: `
          <div class="balloon">
            <h4>SitDownPls на Солянке</h4>
            <address>м. Китай-город, ул. Солянка, д.24</address>
            <a href="tel:+74958854547" class="tel-number">
              <svg viewbox="0 0 32 32">
                <use xlink:href="sprite.svg#Vector"></use>
              </svg>
              <span>+7 (495) 885-45-47</span>
            </a>
            <div class="worktime">
              <span class="grey-text">Часы работы:</span>
              с 10:00 до 21:00
            </div>
            <div class="balloon__descr">
              <span class="grey-text">Что здесь:</span>
              шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр
            </div>
          </div>
        `,
        },
          {
            iconLayout: 'default#imageWithContent',
            iconImageHref: './img/svg/mapIcon.svg',
            iconImageSize: [32, 22],
            iconImageOffset: [-20, 0],
            iconContentOffset: [0],
            iconContentLayout: MyIconContentLayout
          });

      const myPlacemark = new ymaps.Placemark([55.76147157505062, 37.65023838640963], {
        balloonContent: 'Второй баллун',
      },
        {
          iconLayout: 'default#imageWithContent',
          iconImageHref: './img/svg/mapIcon.svg',
          iconImageSize: [32, 22],
          iconImageOffset: [-20, 0],
          iconContentOffset: [0],
          iconContentLayout: MyIconContentLayout
        });

      myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemarkWithContent);

      myMap.controls.remove('geolocationControl'); // удаляем геолокацию
      myMap.controls.remove('searchControl'); // удаляем поиск
      myMap.controls.remove('trafficControl'); // удаляем контроль трафика
      myMap.controls.remove('typeSelector'); // удаляем тип
      myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
      myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
      myMap.controls.remove('rulerControl'); // удаляем контрол правил
      myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    });
  }
});
