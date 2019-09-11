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
    let currentLeft = parseInt(computed.left)
         if (currentLeft > -1880) {
        sliderList.style.left = currentLeft - 940 + "px";
         }

         
         
        
    
});
left.addEventListener("click", e => {
    e.preventDefault();
    let currentLeft = parseInt(computed.left)   
    if (currentLeft < 1880)      
    sliderList.style.left = currentLeft + 940 + "px";
        
})






let team__item = document.querySelectorAll(".team__item");
let team = document.querySelector(".team__people");


team.addEventListener("click", function(e) {
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
    }

    
    document.addEventListener("keyup", e => {
        let keyName = e.key;

        if(keyName === "Escape") {
            overlay.style.display = "none"
        }
        
    })
    let overlayExit = document.querySelector(".overlay__exit");
    overlayExit.addEventListener("click", e => {
        e.preventDefault();
        overlay.style.display = "none"
    })
});



