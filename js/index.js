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
         else {
        sliderList.style.left = currentLeft + 940*4 + "px";
         }
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
    
    






        
    