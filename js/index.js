let menu__item = document.querySelectorAll("#menu__item");
for (let i = 0; i < menu__item.length; i++) {
menu__item[i].addEventListener("click", function() {
    menu__item[i].classList.toggle('menu__item--active')})
}

let team__item = document.querySelectorAll("#team__item");
for (let i = 0; i < team__item.length; i++) {
    team__item[i].addEventListener("click", function() {
        team__item[i].classList.toggle("team__item--active")
    })
}