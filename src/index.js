$(document).ready(function(){

let menu__item = document.querySelectorAll("#menu__item");
let menu = document.querySelector(".menu");

menu.addEventListener("click", function(e) {
for (let i = 0; i < menu__item.length; i++) {
    menu__item [i].classList.remove("menu__item--active");
}
})

for (let i = 0; i < menu__item.length; i++) {
    menu__item[i].addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (menu__item[i].classList.contains('menu__item--active')) {
            menu__item[i].classList.remove("menu__item--active")
        }
        else {
            for (let i = 0; i < menu__item.length; i++) {
            menu__item[i].classList.remove('menu__item--active');
            }
            menu__item[i].classList.add('menu__item--active')
        }
    })
}


const left = document.querySelector(".scrollarrow--left");
const right = document.querySelector(".scrollarrow--right");
const sliderList = document.querySelector(".slider__list");
const slides = document.querySelectorAll(".slider__item");
const computed = getComputedStyle(sliderList);


right.addEventListener('click', e => {
    e.preventDefault();
    function(e) =>{

    $(".slider__list").attr("left") - 100 + "%"
    }
    // let currentLeft = parseInt(computed.left)
    //      if (currentLeft > -1880) {
    //     sliderList.style.left = currentLeft - "100%"
    //      }
    //      else {
    //     sliderList.style.left = currentLeft + 940*4 + "px";
    //      }
});
left.addEventListener("click", e => {
    e.preventDefault();
    let currentLeft = parseInt(computed.left)   
    if (currentLeft < 1880)  {    
    sliderList.style.left = currentLeft + 940 + "px";        
}
    else {
        sliderList.style.left = currentLeft - 940*4 + "px";
    }

})

// Скролл

const sections = $(".section");
const display = $(".maincontent");
let inscroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const countPositionPercent = sectionEq => {
  return `${sectionEq * -100}%`;
};

const switchActiveClass = (elems, elemNdx) => {
  elems
    .eq(elemNdx)
    .addClass("active")
    .siblings()
    .removeClass("active");
};

const unBlockScroll = () => {
  setTimeout(() => {
    inscroll = false;
  }, 1300); // подождать пока завершится инерция на тачпадах
};

const performTransition = sectionEq => {
  if (inscroll) return;
  inscroll = true;

  const position = countPositionPercent(sectionEq);
  const switchFixedMenuClass = () =>
    switchActiveClass($(".fixed-menu__item"), sectionEq);

  switchActiveClass(sections, sectionEq);
  switchFixedMenuClass();

  display.css({
    transform: `translateY(${position})`
  });

 

  unBlockScroll();
};

const scrollViewport = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();


  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
};

$(document).on({
    wheel: e => {
      const deltaY = e.originalEvent.deltaY;
  
      if (deltaY < 0) {
          scrollViewport("prev")
      }
      if (deltaY > 0) {
          scrollViewport("next")
      }
      
    },
    keydown: e => {
      const tagName = e.target.tagName.toLowerCase();
      const userTypingInInputs = tagName === "input" || tagName === "textarea";
  
      if (userTypingInInputs) return;
  
      switch (e.keyCode) {
        case 40:
          scrollViewport("next");
          break;
  
        case 38:
          scrollViewport("prev");
          break;
      }
    }
  });



$("[data-scroll-to]").on("click", e => {
  e.preventDefault();
  performTransition(parseInt($(e.currentTarget).attr("data-scroll-to")));
});

// разрешаем свайп на мобильниках
if (isMobile) {
  window.addEventListener(
    "touchmove",
    e => {
      e.preventDefault();
    },
    { passive: false }
  );

  $("body").swipe({
    swipe: (event, direction) => {
      let scrollDirecrion;
      if (direction === "up") scrollDirecrion = "next";
      if (direction === "down") scrollDirecrion = "prev";
      scrollViewport(scrollDirecrion);
    }
  });
}







let team__item = document.querySelectorAll(".team__item");
let team = document.querySelector(".team__people");


team.addEventListener("click", function(e) {
    e.preventDefault();
    for (let i = 0; i < team__item.length; i++) {
        team__item[i].classList.remove("team__item--active");
    }
    })
    
    for (let i = 0; i < team__item.length; i++) {
        team__item[i].addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (team__item[i].classList.contains('team__item--active')) {
                team__item[i].classList.remove("team__item--active")                
            }
            else {
                for (let i = 0; i < team__item.length; i++) {
               team__item[i].classList.remove('team__item--active');
                }
                team__item[i].classList.add('team__item--active')                
            }
        })
    }


let header__menu__link = document.querySelector("#menulink");
let hamburger__fullscreen = document.querySelector("#fullscreen");
header__menu__link.addEventListener ("click", function(){
    fullscreen.style.right = '0' }
)
$(".hamburger__link").on("click", e =>{
  fullscreen.style.right = '-100%'
})

let exit = document.querySelector("#exit");

exit.addEventListener ("click", function(e){    
    e.preventDefault();
    hamburger__fullscreen.style.right = "-100%";
} )

const reviews = document.querySelector(".reviews");
const overlay = document.querySelector(".overlay");
const popupText = document.querySelector(".overlay__text");


reviews.addEventListener("click", e=> {
    let elem = e.target;
    if (elem.tagName === "BUTTON") {        
        var modalText = elem.previousElementSibling.previousElementSibling.innerHTML + elem.previousElementSibling.innerHTML;         
        popupText.innerHTML = modalText;        
        overlay.style.display = "block";
        document.body.style.overflow = 'hidden';        
    }

    
    document.addEventListener("keyup", e => {
        let keyName = e.key;

        if(keyName === "Escape") {
            overlay.style.display = "none"
            document.body.style.overflow = 'inherit';
        }
        
    })
    let overlayExit = document.querySelector(".overlay__exit");
    overlayExit.addEventListener("click", e => {
        e.preventDefault();
        overlay.style.display = "none"
        document.body.style.overflow = 'inherit';
    })
});



const myForm = document.querySelector(".form__elem")
const sendButton = document.querySelector(".btn--send")

    
    myForm.addEventListener("keydown", e => {    
    if (e.target.name == 'phone'  || e.target.name == 'apartment' || e.target.name == 'floor' ) {
    let isDigit = false;
    let isDash = false;
    let isControl = false;

    if (e.key >= 0 || e.key <= 9) {
        isDigit = true
    }
    if (e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "Backspace") {
        isControl = true
    }
    if (!isDigit && !isControl) {
        e.preventDefault();
    }
    }
})



sendButton.addEventListener ("click", e => {
    e.preventDefault();
    if (validateForm(myForm)) {     
        const data = {
            apartment: myForm.elements.apartment.value,
            building: myForm.elements.building.value,
            comment: myForm.elements.comment.value,
            floor: myForm.elements.floor.value,
            home: myForm.elements.home.value,
            name: myForm.elements.name.value,
            phone: myForm.elements.phone.value,
            question1: myForm.elements.question1.checked,
            question2: myForm.elements.question2.checked,
            question3: myForm.elements.question3.checked,
            street: myForm.elements.street.value
        }
       
    const formData = new FormData(myForm);
    formData.append("name", myForm.elements.name.value);
    formData.append("phone", myForm.elements.phone.value);
    formData.append("comment", myForm.elements.comment.value);
    formData.append("to", "gi.32@gmail.com"); 
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(formData); 
    xhr.responseType = "json";
    xhr.addEventListener("load", function() {
       
        if (xhr.response.status) {
           
            let overlayForm = document.querySelector(".overlay--modal");
            overlayForm.style.display = "block";
            document.body.style.overflow = 'hidden';
            let popupText = document.querySelector(".overlay__text--modal")
            popupText.innerHTML = "Заказ отправлен";    
            myForm.reset();
            document.addEventListener("keyup", e => {
            let keyName = e.key;        
            if(keyName === "Escape") {
            overlayForm.style.display = "none"
            
            }                
        })
        let overlayExit = document.querySelector(".overlay__exit--modal");
        overlayExit.addEventListener("click", e => {
        e.preventDefault();
        overlayForm.style.display = "none"
        document.body.style.overflow = 'inherit';
        })
    } 
    })
    }
});
    function validateForm(form) {
        let valid = true;
    
        if(!validateField(myForm.elements.name)) {
            valid = false;
        }
    
        if(!validateField(myForm.elements.phone)) {
            valid = false;
        }
    
        if(!validateField(myForm.elements.comment)) {
            valid = false;
        }
    
        return valid;
    }
    
    function validateField(field) {
        
            field.nextElementSibling.textContent = field.validationMessage;
            return field.checkValidity(); 
        }

  
    ymaps.ready(init);
    
        function init(){ 
            var myMap = new ymaps.Map("map", {
                center: [59.93543728, 30.32056584],
                zoom: 12,
                controls: ['zoomControl'],
                behaviors: ['drag']
            }); 
            myGeoObjects = [];
            myGeoObjects[0] = new ymaps.Placemark ([59.97801011, 30.31133680], {}, {
              iconLayout: 'default#image',
              iconImageHref: 'images/icons/map-marker.svg',
              iconImageSize: [46, 57],
              iconImageOffset: [-20, -20]
            });
            myGeoObjects[1] = new ymaps.Placemark ([59.94513339, 30.38312347], {}, {
              iconLayout: 'default#image',
              iconImageHref: 'images/icons/map-marker.svg',
              iconImageSize: [46, 57],
              iconImageOffset: [-20, -20]
            });
            myGeoObjects[2] = new ymaps.Placemark ([59.92042544, 30.49717524], {}, {
              iconLayout: 'default#image',
              iconImageHref: 'images/icons/map-marker.svg',
              iconImageSize: [46, 57],
              iconImageOffset: [-20, -40]
            });
            myGeoObjects[3] = new ymaps.Placemark ([59.88686609, 30.31857879], {}, {
              iconLayout: 'default#image',
              iconImageHref: 'images/icons/map-marker.svg',
              iconImageSize: [46, 57],
              iconImageOffset: [-20, -40]
            });

            var clusterer = new ymaps.Clusterer({clusterDisableClickZoom: true})
            clusterer.add(myGeoObjects);
            myMap.geoObjects.add(clusterer);
        };

      video = document.querySelector(".player")
      progress = document.querySelector(".bar")

      var isStarted = false; 
      $('#play-pause').add('.player').click(function() {
          if(!isStarted){ 
              isStarted = true;
              $('#play-pause').addClass ('pause')
              video.play();
          } else {
              isStarted = false;
              $('#play-pause').removeClass ('pause')
              
              video.pause();
              
          }
      })      

      $('#volume').on('change', function() {
        $('.player').prop("volume", this.value);
    });
     
      
      $('.sound__img').click ( e => {
        if(video.muted){
          $('.player').prop('muted', false);          
      }
      else{
          $('.player').prop('muted',true);          
      }
    })
    

    video.ontimeupdate = progressUpdate;
    progress.onclick = videoRewind;

    function progressUpdate() {
      let d = video.duration;
      let c = video.currentTime;
      progress.value = 100 * c/d;
    }
    function videoRewind() {
      let w = this.offsetWidth;
      let o = event.offsetX;
      this.value = 100 * o/w;
      video.pause();
      video.currentTime = video.duration* (o/w);
      video.play();
    }
})
