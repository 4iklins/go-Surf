"use strict";
let navItems = [...document.querySelectorAll(".slider-dots__box")];
let slideItems = [...document.querySelectorAll(".slider-item")];
let navBox = document.querySelector('.slider-dots');
let buttonRight = document.querySelector(".header__button--right");
let buttonLeft = document.querySelector(".header__button--left");
let slideNumber = 0;
let travelSlideNumber = 0;
let sleepSlideNumber = 0;
let shopSlideNumber = 0;

let northItems = [...document.querySelectorAll('.north-shore')];
let southItems = [...document.querySelectorAll('.south-shore')];
let westItems = [...document.querySelectorAll('.west-shore')];
let eastItems = [...document.querySelectorAll('.east-shore')];

let mapLines = {
  0 : northItems,
  1 : southItems,
  2 : westItems,
  3 : eastItems
};

let container = document.querySelector('.container');
let windowWidth = container.clientWidth;


let position = 0;
let slidesToShow = 4;

if(windowWidth <= 1300 && windowWidth >= 768){
  slidesToShow = 3;
} else if(windowWidth < 767 && windowWidth >= 530){
  slidesToShow = 2;
} else if(windowWidth < 530){
  slidesToShow = 1;
};

let slidesToScrol = 1;
let surfContainer = document.querySelector('.surf-slider');
let track = document.querySelector('.surf-slider__track');
let slides = [...document.querySelectorAll('.surf-box')];
let slidesInner = [...document.querySelectorAll('.surf-box__inner')]
let slidesCount = slides.length;

let SurfButtonRight = document.querySelector(".surf__button--right");
let SurfButtonLeft = document.querySelector(".surf__button--left");
let slideWidth = surfContainer.clientWidth / slidesToShow;
let movePosition = slidesToScrol * slideWidth;
let surfActiveslideNumber = 1;

if(windowWidth < 530){
  surfActiveslideNumber = 0;
};

let cards = document.querySelectorAll('.world-map__content');
let cardLocNames = document.querySelectorAll('.world-map__content-title');
let guestMinusButton = document.querySelectorAll('.guests-minus');
let guestPlusButton = document.querySelectorAll('.guests-plus');
let nightMinusButton = document.querySelectorAll('.nights-minus');
let nightPlusButton = document.querySelectorAll('.nights-plus');
let nightsCount = document.querySelectorAll('.nights-count');
let guestsCount = document.querySelectorAll('.guests-count');

let quantity = document.querySelectorAll('.quantity');
let price = document.querySelectorAll('.price');
let surfBoardCircleBtn = document.querySelectorAll('.surfboard-box__circle');

let travelSlides = document.querySelectorAll('.holder-slide--travel');
let sleepSlides = document.querySelectorAll('.holder-slide--sleep');
let travelLeftButton =document.querySelector('.travel__button--left');
let travelRightButton =document.querySelector('.travel__button--right');
let sleepLeftButton =document.querySelector('.sleep__button--left');
let sleepRightButton =document.querySelector('.sleep__button--right');
let shopLeftButton =document.querySelector('.shop__button--left');
let shopRightButton =document.querySelector('.shop__button--right');
let shopSlides = document.querySelectorAll('.shop__slider-item');
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');

let anchors = document.querySelectorAll('a[href*="#"]');


//slide to anchor
anchors.forEach(element => {
  element.addEventListener('click', (evt)=>{
    evt.preventDefault();
    let blockId = element.getAttribute('href');
    document.querySelector(''+ blockId).scrollIntoView({
      behavior : "smooth",
      block : "start"
    })
  })
});

// Header slider-start
function setData (array) {
  array.forEach((item, index) =>{
    item.dataset.index = index;
    if (index === 0) {
      item.classList.add('active')
    }
  });
};

function classRemove(array,index) {
  array[index].classList.remove("active");
}

function classAdd(array,index) {
  array[index].classList.add("active");
}

function toggleActive(index) {
  for(let i = 0; i < slideItems.length; i++) {
    if (i === Number(index)){
      classAdd(navItems, i);
      classAdd(slideItems, i);
      lineChoose(i);
      slideNumber = i;
      headerBtnCheck();
    } else {
      classRemove(navItems, i);
      classRemove(slideItems, i);
      lineDell(i);
    }
  }
};

function lineChoose (index) {
  mapLines[index].forEach(function (item){
    item.classList.remove('visibility-hidden')
  });
};

function lineDell (index) { 
mapLines[index].forEach(function(item){
  item.classList.add('visibility-hidden')
});
};

function onRightHeaderButtonClick() {
  slideNumber += 1;
  headerBtnCheck();
  for(let i = 0; i < slideItems.length; i++){
    if(slideNumber === i){
      classAdd(navItems, i);
      classAdd(slideItems, i);
      lineChoose(i);
    } else {
      classRemove(navItems, i);
      classRemove(slideItems, i);
      lineDell(i);
    }
  }
};

function onLeftHeaderButtonClick() {
  slideNumber -= 1;
  headerBtnCheck();
  for(let i = 0; i < slideItems.length; i++){
    if(slideNumber === i){
      classAdd(navItems, i);
      classAdd(slideItems, i);
      lineChoose(i);
    } else {
      classRemove(navItems, i);
      classRemove(slideItems, i);
      lineDell(i);
    }
  }
};

navBox.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('slider-dots__box')){
    toggleActive(evt.target.dataset.index);
  }
});

buttonRight.addEventListener("click", onRightHeaderButtonClick);
buttonLeft.addEventListener("click", onLeftHeaderButtonClick);
// Header slider-end


// Surf slider-start
slides.forEach(function(slide){
  slide.style.minWidth = slideWidth + 'px';
});

SurfButtonRight.addEventListener('click', function () {
  let slidesLeft = slidesCount - (Math.abs(position) + slidesToShow * slideWidth)/slideWidth;
  position -= slidesLeft >= slidesToScrol ? movePosition : slidesLeft * slideWidth;
  setPosition();
  if(windowWidth < 530){
  surfActiveslideNumber += 1;
  showSurfLocCard(slidesInner[surfActiveslideNumber]);
  }
  surfBtncheck();
});

SurfButtonLeft.addEventListener('click', function() {
  let slidesLeft = Math.abs(position)/ slideWidth;
  position += slidesLeft >= slidesToScrol ? movePosition : slidesLeft * slideWidth;
  setPosition();
  if(windowWidth < 530){
    surfActiveslideNumber -= 1;
    showSurfLocCard(slidesInner[surfActiveslideNumber]);
  }
  surfBtncheck();
});

function setPosition () {
  track.style.transform = 'translateX(' + position + 'px)'
};
// Surf slider-end

// Surf slider active slide

function setActiveSurfSlide () {
  if(windowWidth < 530){
    setAllSlidesActive(slidesInner);
  } else {
    setDataForSurfSlides(slidesInner);
  }
}

function setAllSlidesActive(array) {
  array.forEach((item, index) =>{
      item.classList.add('active')
  });
}

function setDataForSurfSlides (array) {
  array.forEach((item, index) =>{
    item.dataset.index = index;
    if (index === surfActiveslideNumber) {
      item.classList.add('active')
    }
  });
};

// slides.forEach((element, i) => {
//   element.style.zIndex = i + '';
// });

function toggleActiveSurfSlide(index) {
  for(let i = 0; i < slidesInner.length; i++) {
    if (i === Number(index)){
      classAdd(slidesInner, i);
      showSurfLocCard(slidesInner[i]);
    } else {
      classRemove(slidesInner, i);
    }
  }
};

track.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('surf-box__inner')){
    toggleActiveSurfSlide(evt.target.dataset.index);
  }
});

function showSurfLocCard (item) {
  let locName = item.firstElementChild.textContent;
  for(let i = 0; i < cardLocNames.length; i++){
    let cardName = cardLocNames[i].textContent;
    if(cardName === locName){
      classAdd(cards, i);
    } else {
      classRemove(cards, i)
    }
  }
};


//Slide width set
function slideSetWidth () {
  let slide = document.querySelectorAll('.slide-width');
  let slider = document.querySelector('.container');
  let containerWidth = slider.clientWidth;
    slide.forEach(element => {
      element.style.width = containerWidth +'px';
  });
}


// travel&shop slider
function flipSlideRight(array,slideNumber) {
  for(let i = 0; i < array.length; i++){
    if(slideNumber === i){
      classAdd(array, i);
    } else {
      classRemove(array, i);
    }
  }
}

function flipSlideLeft(array,slideNumber) {
  for(let i = 0; i < array.length; i++){
    if(slideNumber === i){
      classAdd(array, i);
    } else {
      classRemove(array, i);
    }
  }
}

function onRightTravelButtonClick() {
  travelSlideNumber += 1;
  travelBtnCheck();
  flipSlideRight(travelSlides, travelSlideNumber);
}
function onLeftTravelButtonClick() {
  travelSlideNumber -= 1;
  travelBtnCheck();
  flipSlideLeft(travelSlides, travelSlideNumber);
}
function onRightShopButtonClick() {
  shopSlideNumber += 1;
  shopBtnCheck();
  flipSlideRight(shopSlides, shopSlideNumber);
}
function onLeftShopButtonClick() {
  shopSlideNumber -= 1;
  shopBtnCheck();
  flipSlideLeft(shopSlides, shopSlideNumber);
}

travelRightButton.addEventListener("click", onRightTravelButtonClick);
travelLeftButton.addEventListener("click", onLeftTravelButtonClick);
shopRightButton.addEventListener("click", onRightShopButtonClick);
shopLeftButton.addEventListener("click", onLeftShopButtonClick);

//Sleep slider
function onRightSleepButtonClick() {
  sleepSlideNumber +=1;
  sleepBtnCheck();
  for(let i = 0; i < sleepSlides.length; i++){
    if(sleepSlideNumber === i){
      classAdd(sleepSlides, i);
      stayPrice(i);
    } else {
      classRemove(sleepSlides, i);
    }
  }
}

function onLeftSleepButtonClick() {
  sleepSlideNumber -=1;
  sleepBtnCheck();
  for(let i = 0; i < sleepSlides.length; i++){
    if(sleepSlideNumber === i){
      classAdd(sleepSlides, i);
      stayPrice(i);
    } else {
      classRemove(sleepSlides, i);
    }
  }
}

sleepRightButton.addEventListener("click", onRightSleepButtonClick);
sleepLeftButton.addEventListener("click", onLeftSleepButtonClick);

function sleepSlideActiveCheck() {

}

// guest&nights count
function plus(item) {
  item.textContent = (Number(item.textContent)+1) + '';
}

function minus(item) {
  item.textContent = (Number(item.textContent)-1) + '';
}

function stayPrice (i) {
  let summ = (Number(guestsCount[i].textContent)-1) * Number(price[i].dataset.guests) + Number(nightsCount[i].textContent) * Number(price[i].dataset.nights);
  price[i].textContent = '$'+ summ + ' USD';
}

quantity.forEach(element => {
  element.addEventListener('click', function(evt) {

    switch(true){
      case evt.target.classList.contains('nights-plus'):
        plus(nightsCount[sleepSlideNumber]);
        nightsBtnCheck();
        stayPrice(sleepSlideNumber);
        break;
      case evt.target.classList.contains('nights-minus'):
        minus(nightsCount[sleepSlideNumber]);
        nightsBtnCheck();
        stayPrice(sleepSlideNumber);
        break;
      case evt.target.classList.contains('guests-plus'):
        plus(guestsCount[sleepSlideNumber]);
        guestBtnCheck();
        stayPrice(sleepSlideNumber);
        break;
      case evt.target.classList.contains('guests-minus'):
        minus(guestsCount[sleepSlideNumber]);
        guestBtnCheck();
        stayPrice(sleepSlideNumber);
        break;
    }
  });
});

//Surfboard features show
surfBoardCircleBtn.forEach(element => {
  element.addEventListener('click', () => {
    element.classList.toggle('minus');
  })
});

//menu btn toggle 

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('show');
});


// Button Check
function surfBtncheck () {
  SurfButtonLeft.disabled = position === 0;
  SurfButtonRight.disabled = position <= -(slidesCount - slidesToShow) * slideWidth;
}

function headerBtnCheck () {
  buttonRight.disabled = slideNumber === slideItems.length - 1;
  buttonLeft.disabled = slideNumber === 0;
}

function travelBtnCheck () {
  travelLeftButton.disabled = travelSlideNumber === 0;
  travelRightButton.disabled = travelSlideNumber === travelSlides.length - 1;
}

function sleepBtnCheck () {
  sleepLeftButton.disabled = sleepSlideNumber === 0;
  sleepRightButton.disabled = sleepSlideNumber === sleepSlides.length - 1;
}

function shopBtnCheck () {
  shopLeftButton.disabled = shopSlideNumber === 0;
  shopRightButton.disabled = shopSlideNumber === shopSlides.length - 1;
}

function guestBtnCheck () {
  guestPlusButton[sleepSlideNumber].disabled = Number(guestsCount[sleepSlideNumber].textContent) === 9;
  guestMinusButton[sleepSlideNumber].disabled = Number(guestsCount[sleepSlideNumber].textContent) === 1;
}

function nightsBtnCheck () {
  nightPlusButton[sleepSlideNumber].disabled = Number(nightsCount[sleepSlideNumber].textContent) === 14;
  nightMinusButton[sleepSlideNumber].disabled = Number(nightsCount[sleepSlideNumber].textContent) === 1;
}

function btnCheck () {
  surfBtncheck();
  headerBtnCheck();
  travelBtnCheck();
  sleepBtnCheck();
  guestBtnCheck();
  nightsBtnCheck();
  shopBtnCheck();
}
// Button Check





slideSetWidth();
setActiveSurfSlide();
showSurfLocCard(slidesInner[surfActiveslideNumber]);
setData(navItems);
setData(slideItems);
setData(travelSlides);
setData(sleepSlides);
setData(shopSlides);
btnCheck();
stayPrice(sleepSlideNumber);
