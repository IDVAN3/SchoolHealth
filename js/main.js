
'use strict'
$(document).ready(function () {

    /* === popup start === */

    let unlock = true;
      const timeout = 300;
      const body = document.querySelector("body");
      const lockPadding = document.querySelectorAll(".lock-padding");
      
      function bodyLock() {
        const lockPaddingValue =
          window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
        if (lockPadding.length > 0) {
          for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
          }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add("lock-scroll");
      
        unlock = false;
        setTimeout(function () {
          unlock = true;
        }, timeout);
      }
      
      function bodyUnlock() {
        setTimeout(function () {
          for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = "0px";
          }
          body.style.paddingRight = "0px";
          body.classList.remove("lock-scroll");
        }, timeout);
      
        unlock = false;
        setTimeout(function () {
          unlock = true;
        }, timeout);
      }

    function openPopup(id) {
        bodyLock(); 
        $(`.js-popup[data-id-popup='${id}']`).fadeIn(300);
      }
      
      function closePopup() {
        bodyUnlock();
        $(".js-popup").fadeOut(300);
      }
      
      $(".js-popup__close").click(closePopup);
      
      $(".js-btn-popup").click(function (e) {
        e.preventDefault();
        let indexBtnPopup = $(this).attr("href");

        openPopup(indexBtnPopup);
      });
      
      $(".js-popup").click(function (e) {
        let popup = $(".js-popup__wrapp");
        
        if (!popup.is(e.target) && popup.has(e.target).length === 0) {
          closePopup();
        }
      });
      
      /* === popup end === */

      // input text in up

      $('.requirements__input').focusin(function(e){
        $(this).prev(".requirements__label").css("opacity", "1")
      })

      $('.requirements__input').focusout(function(e){
        $(this).prev(".requirements__label").css("opacity", "0")
      })

      // sliders 

      $('.result-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
    });

    //rating 

      const ratingItemsList = document.querySelectorAll('.rating__item');
      const ratingItemsAray = Array.prototype.slice.call(ratingItemsList);

      ratingItemsAray.forEach(item =>
          item.addEventListener('click', () => {
              const { itemValue } = item.dataset;
              item.parentNode.dataset.totalValue = itemValue;
          })
      )

    // scroll to block

    // let heightHeader = $(".header").height();
    $('.header__list li a').click(function(){
        if($('body').has('.lock')) {
          $('body').removeClass('lock');
          $('.header__burger,.header__menu').removeClass('active');
        }
        
        let element = $(this).attr('href');
        // let dist = $(element).offset().top-heightHeader;
        let dist = $(element).offset().top;

        $('html, body').animate({'scrollTop': dist}, 500);

        return false;
    })

    // header__burger

    $('.header__burger').click(function(event) {
      $('.header__burger,.header__menu').toggleClass('active');
      $('body').toggleClass('lock');
    });

});
/*кнопка прокрутки вверх*/

const offset = 100;
const scrollUp = document.querySelector('.js-scroll-up');
const scrollUpSvgPath = document.querySelector('.js-scroll-up__path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = '\'' + pathLength + pathLength + '\'';
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

// getTop
const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

//updateDashoffset

const updateDashoffset = () => {
    const heigth = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength / heigth);

    scrollUpSvgPath.style.strokeDashoffset = dashoffset;
}

// onScroll
window.addEventListener('scroll', () => {
    updateDashoffset();
    getTop() > offset ? scrollUp.classList.add('scroll-up_active') : scrollUp.classList.remove('scroll-up_active');
});

// click
scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

/*скрол по якорю*/