"use strict";
var defaultSectionHeight = $("section").innerHeight(),
    content = $(".content");

function goingUp() {
    console.log("идем вверх");
    var e = $(".section-active"),
        o = e.prev(),
        n = o.index(),
        t = $("section").innerHeight(),
        i = $(".sidemenu__button--active"),
        c = i.prev();
    i.prev();
    o.length && content.stop(!0, !1).animate({
        top: -n * t + "px"
    }, 400, function() {
        e.removeClass("section-active"), o.addClass("section-active"), i.removeClass("sidemenu__button--active"), c.addClass("sidemenu__button--active")
    })
}

function goingDown() {
    console.log("идем вниз");
    var e = $(".section-active"),
        o = e.next(),
        n = o.index(),
        t = $("section").innerHeight(),
        i = $(".sidemenu__button--active"),
        c = i.next();
    i.index();
    o.length && content.stop(!0, !1).animate({
        top: -n * t + "px"
    }, 400, function() {
        e.removeClass("section-active"), o.addClass("section-active"), i.removeClass("sidemenu__button--active"), c.addClass("sidemenu__button--active")
    })
}

function wheelScroll() {
    $("body").on("wheel", function(e) {
        e.originalEvent.deltaY < 0 ? goingDown() : goingUp()
    })
}

function swipeScroll() {
    var n;
    $(document).bind("touchstart", function(e) {
        n = e.originalEvent.touches[0].clientY
    }), $(document).bind("touchend", function(e) {
        var o = e.originalEvent.changedTouches[0].clientY;
        o + 5 < n ? goingDown() : n < o - 5 && goingUp()
    })
}

function keyScroll() {
    $("body").keydown(function(e) {
        console.log("нажал " + e.which), 38 === e.which && goingUp(), 40 === e.which && goingDown()
    })
}
$(document).ready(function() {
    console.log(defaultSectionHeight + " дефолтная высота секции"), wheelScroll(), keyScroll()
});
var verticalItem = $(".vertical-menu-list__element");
verticalItem.on("click", function(e) {
    var o = $("section").innerHeight(),
        n = $(this).index() + 1;
    console.log(n + " thisIndex"), e.preventDefault(), content.stop(!0, !1).animate({
        top: -$("section:not(.order):eq(" + n + ")").index() * o + "px"
    }, 300, function() {
        $("section:not(.order):eq(" + n + ")").addClass("section-active"), $("section:not(.order):eq(" + n + ")").siblings().removeClass("section-active")
    })
});
var horizontalItem = $(".navigation__element");
horizontalItem.on("click", function(e) {
    $("section:not(.order)");
    var o = $("section").innerHeight(),
        n = $(this).index() + 1;
    console.log($("section:not(.order):eq(" + n + ")").index()), e.preventDefault(), content.stop(!0, !1).animate({
        top: -$("section:not(.order):eq(" + n + ")").index() * o + "px"
    }, 300, function() {
        $("section:not(.order):eq(" + n + ")").addClass("section-active"), $("section:not(.order):eq(" + n + ")").siblings().removeClass("section-active");
        var e = $(".section-active").index();
        $(".sidemenu__button:eq(" + e + ")").addClass("sidemenu__button--active"), $(".sidemenu__button:eq(" + e + ")").siblings().removeClass("sidemenu__button--active")
    })
});
var sideMenuButton = $(".sidemenu__button");
sideMenuButton.on("click", function(e) {
    e.preventDefault;
    var o = $(".sidemenu__button--active"),
        n = (o.index(), $(window).height(), $(".section-active"));
    o.removeClass("sidemenu__button--active"), $(this).addClass("sidemenu__button--active"), content.stop(!0, !1).animate({
        top: 100 * -$(this).index() + "vh"
    }, 300, function() {
        var e = $(".sidemenu__button--active").index(),
            o = $("section:eq(" + parseInt(e) + ")");
        n.removeClass("section-active"), o.addClass("section-active"), console.log(e + " индекс кнопки")
    })
}), $(".form__input").focus(function() {
    var e = $("section").innerHeight(),
        o = $(".order").index() * -e;
    console.log(o), console.log("куку"), $(".order").css({
        position: "fixed",
        left: "0",
        top: "0",
        bottom: "0",
        right: "0"
    }), $(".lock").css({
        display: "block"
    })
}), $(".form__input").blur(function() {
    $("section").innerHeight();
    var e = $(".order").index() * -defaultSectionHeight;
    console.log("куку"), $(".order").css({
        position: "relative"
    }), $(".order").addClass("section-active"), $(".order").siblings().removeClass("section-active"), content.css("top", e + "px"), $(".lock").css({
        display: "none"
    })
});
var form = document.querySelector(".form__elem"),
    formButton = document.querySelector(".button--form"),
    fields = document.querySelectorAll(".form__input"),
    modal = document.querySelector(".modal"),
    modalText = document.querySelector(".modal-window--text"),
    modalButton = document.querySelector(".modal-window--button"),
    body = document.querySelector("body");
formButton.addEventListener("click", function(e) {
    e.preventDefault(), content.stop(!0, !1).animate({
        top: -$(".order").index() * defaultSectionHeight + "px"
    }, 300, function() {
        var e = $(".order").index();
        $(".order").siblings().removeClass("section-active"), $(".order").addClass("section-active"), $(".sidemenu__button:eq(" + e + ")").addClass("sidemenu__button--active"), $(".sidemenu__button:eq(" + e + ")").siblings().removeClass("sidemenu__button--active")
    });
    var o = {
            name: form.elements.name.value,
            phone: form.elements.phone.value,
            comment: form.elements.comment.value
        },
        n = new FormData(form);
    n.append("name", form.elements.name.value), n.append("phone", form.elements.phone.value), n.append("comment", form.elements.comment.value), n.append("to", "my@gmail.com"), console.log(n), console.log(o);
    var t = new XMLHttpRequest;

    function i() {
        return !!(form.elements.name.checkValidity() && form.elements.phone.checkValidity() && form.elements.comment.checkValidity())
    }
    console.log(i()), i() ? (t.open("POST", "https://webdev-api.loftschool.com/sendmail"), t.send(n), t.responseType = "json", t.addEventListener("load", function() {
        t.response.status ? (modal.style.display = "flex", modalText.textContent = "Сообщение отправлено", form.reset()) : (modal.style.display = "flex", modalText.textContent = "что-то пошло не так, попробуйте еще раз")
    })) : (modal.style.display = "flex", modalText.textContent = 'Поля "Имя","Телефон" и "Комментарий" нужно заполнить, без них доставку не оформить')
}), $(".modal-window--button").on("click", function() {
    var e = $("section").innerHeight(),
        o = $(".order").index() * -e;
    $(".modal").css("display", "none"), $(".content").css("top", o + "px")
}), $(".button--order").on("click", function(e) {
    $("section").innerHeight();
    e.preventDefault(), content.stop(!0, !1).animate({
        top: -$(".order").index() * defaultSectionHeight + "px"
    }, 300, function() {
        var e = $(".order").index();
        $(".order").siblings().removeClass("section-active"), $(".order").addClass("section-active"), $(".sidemenu__button:eq(" + e + ")").addClass("sidemenu__button--active"), $(".sidemenu__button:eq(" + e + ")").siblings().removeClass("sidemenu__button--active")
    })
});
var buttonBurger = document.querySelector(".button-burger"),
    wallpaperFullscreen = document.querySelector(".wallpaper--fullscreen");
buttonBurger.addEventListener("click", function() {
    wallpaperFullscreen.style.right = "0"
});
var fullscreenExit = document.querySelector(".fullscreen__exit");
fullscreenExit.addEventListener("click", function() {
    wallpaperFullscreen.style.right = "-100%"
});
for (var a = document.querySelectorAll("a"), i = 0; i < a.length; i++) a[i].addEventListener("click", function() {
    wallpaperFullscreen.style.right = "-100%"
});
for (var menuAccordeonCard = document.querySelectorAll(".menu-accordeon__card"), _loop = function(t) {
        menuAccordeonCard[t].addEventListener("click", function() {
            var e = document.querySelector(".menu-accordeon__card--active"),
                o = document.querySelector(".menu-aside").clientWidth;
            console.log(o);
            document.querySelectorAll(".menu-accordeon__button");
            var n = menuAccordeonCard[t].childNodes[3].firstElementChild.scrollWidth + "px";
            e ? (e.childNodes[3].style.width = 0, console.log(menuAccordeonCard[0].childNodes[3].firstElementChild.offsetWidth), console.log(menuAccordeonCard[0].childNodes[3].firstElementChild), console.log(menuAccordeonCard[0].childNodes[3]), console.log(o + " меню асайд"), console.log(n), e.classList.remove("menu-accordeon__card--active"), e !== menuAccordeonCard[t] && (menuAccordeonCard[t].classList.add("menu-accordeon__card--active"), menuAccordeonCard[t].childNodes[3].style.width = n)) : (menuAccordeonCard[t].classList.add("menu-accordeon__card--active"), menuAccordeonCard[t].childNodes[3].style.width = n, console.log(menuAccordeonCard[t].childNodes[3]))
        })
    }, _i = 0; _i < menuAccordeonCard.length; _i++) _loop(_i);
for (var accordeonCard = document.querySelectorAll(".accordeon__card"), _loop2 = function(n) {
        accordeonCard[n].addEventListener("click", function() {
            var e = document.querySelector(".accordeon__card--active"),
                o = accordeonCard[n].childNodes[3].firstElementChild.clientHeight + "px";
            e ? (e.childNodes[3].style.height = 0, console.log(accordeonCard[0].childNodes[3].firstElementChild.clientHeight), console.log(accordeonCard[0].childNodes[3].firstElementChild), e.classList.remove("accordeon__card--active"), e !== accordeonCard[n] && (accordeonCard[n].classList.add("accordeon__card--active"), accordeonCard[n].childNodes[3].style.height = o)) : (accordeonCard[n].classList.add("accordeon__card--active"), accordeonCard[n].childNodes[3].style.height = o)
        })
    }, _i2 = 0; _i2 < accordeonCard.length; _i2++) _loop2(_i2);
var arrowLeft = $(".slider-button__arrow--left"),
    arrowRight = $(".slider-button__arrow--right"),
    slidersList = $(".sliders-list"),
    slides = $(".slider-card");
console.log(slides.length), arrowLeft.on("click", function() {
    var e = $(".slider-card--active"),
        o = e.prev(),
        n = o.index();
    o.length && slidersList.animate({
        left: 100 * -n + "%"
    }, 300, function() {
        e.removeClass("slider-card--active"), o.addClass("slider-card--active")
    })
}), arrowRight.on("click", function() {
    var e = $(".slider-card--active"),
        o = e.next(),
        n = o.index();
    o.length && slidersList.animate({
        left: 100 * -n + "%"
    }, 300, function() {
        e.removeClass("slider-card--active"), o.addClass("slider-card--active")
    })
});
var feedbackExit = document.querySelector(".popup__exit--feedback"),
    popupFeedback = document.querySelector(".feedback-popup"),
    feedbackButtons = document.querySelectorAll(".button--reviews"),
    reviews = document.querySelectorAll(".reviews__article");
feedbackExit.addEventListener("click", function() {
    popupFeedback.style.display = "none"
});
for (var _loop3 = function(i) {
        feedbackButtons[i].addEventListener("click", function() {
            popupFeedback.style.display = "flex";
            var e = document.querySelector(".feedback-popup__name"),
                o = document.querySelectorAll(".reviews__name"),
                n = document.querySelector(".feedback-popup__text"),
                t = document.querySelectorAll(".reviews__text");
            e.textContent = o[i].textContent, n.textContent = t[i].textContent
        })
    }, _i3 = 0; _i3 < feedbackButtons.length; _i3++) _loop3(_i3);
var activeSectionPosition = 100 * $(".section-active").index() + "vh";
console.log(activeSectionPosition);
var video, durationControl, soundControl, intervalId, logo = $(".logo");

function playStop() {
    document.querySelector(".video__play").classList.toggle("video__play--active"), durationControl.max = video.duration, video.paused ? (video.play(), intervalId = setInterval(updateDuration, 1e3 / 66)) : (video.pause(), clearInterval(intervalId))
}

function updateDuration() {
    durationControl.value = video.currentTime
}

function stopInterval() {
    video.pause(), clearInterval(intervalId)
}

function setVideoDuration() {
    video.paused ? video.play() : video.pause(), video.currentTime = durationControl.value, intervalId = setInterval(updateDuration, 1e3 / 66)
}

function changeSoundVolume() {
    video.volume = soundControl.value / 10
}

function soundOf() {
    0 === video.volume ? (video.volume = soundLevel, soundControl.value = 10 * soundLevel) : (soundLevel = video.volume, video.volume = 0, soundControl.value = 0)
}

function init() {
    var e = new ymaps.Map("yandexmap", {
            center: [59.93511328687912, 30.307292324790485],
            controls: ["zoomControl", "geolocationControl"],
            behaviors: ["drag"],
            zoom: 10
        }),
        o = new ymaps.Placemark([59.953198673530146, 30.393466336020953], {
            hintContent: "<div>Улица Пушикна, дом 50. Работаем каждый день с 12 до 23 часов.</div>",
            balloonContent: "<div>Улица Пушикна, дом 50. Работаем каждый день с 12 до 23 часов.<br> Телефон: 8(800)555-65-35</div>"
        }, {
            iconLayout: "default#image",
            iconImageHref: "img/map/map-marker.png",
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -57]
        });
    e.geoObjects.add(o);
    var n = new ymaps.Placemark([60.06179348690544, 30.315511972036752], {
        hintContent: "<div>Улица Пушикна, дом 50. Работаем каждый день с 12 до 23 часов.</div>",
        balloonContent: "<div>Улица Пушикна, дом 50. Работаем каждый день с 12 до 23 часов.<br> Телефон: 8(800)555-65-35</div>"
    }, {
        iconLayout: "default#image",
        iconImageHref: "img/map/map-marker.png",
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57]
    });
    e.geoObjects.add(n);
    var t = new ymaps.Placemark([59.90158991123217, 30.501454044039573], {
        hintContent: "<div>Улица Пушикна, дом 50. Работаем каждый день с 12 до 23 часов.</div>",
        balloonContent: "<div>Улица Пушикна, дом 50. Работаем каждый день с 12 до 23 часов.<br> Телефон: 8(800)555-65-35</div>"
    }, {
        iconLayout: "default#image",
        iconImageHref: "img/map/map-marker.png",
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57]
    });
    e.geoObjects.add(t);
    var i = new ymaps.Placemark([59.83427718228793, 30.321805167353265], {
        hintContent: "<div>Улица Пушикна, дом 50. Работаем каждый день с 12 до 23 часов.</div>",
        balloonContent: "<div>Улица Пушикна, дом 50. Работаем каждый день с 12 до 23 часов.<br> Телефон: 8(800)555-65-35</div>"
    }, {
        iconLayout: "default#image",
        iconImageHref: "img/map/map-marker.png",
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57]
    });
    e.geoObjects.add(i)
}
logo.on("click", function(e) {
    content.stop(!0, !1).animate({
        top: 0
    }, 300, function() {
        $(".firstscreen").addClass("section-active"), $(".firstscreen").siblings().removeClass("section-active")
    })
}), document.addEventListener("DOMContentLoaded", function(e) {
    (video = document.getElementById("video")).addEventListener("click", playStop);
    for (var o = document.querySelectorAll(".play"), n = 0; n < o.length; n++) o[n].addEventListener("click", playStop);
    document.getElementById("micLevel").addEventListener("click", soundOf), (durationControl = document.getElementById("durationLevel")).addEventListener("mousedown", stopInterval), durationControl.addEventListener("click", setVideoDuration), durationControl.min = 0, durationControl.value = 0, (soundControl = document.getElementById("volumeLevel")).addEventListener("click", changeSoundVolume), soundControl.addEventListener("mouseup", changeSoundVolume), soundControl.min = 0, soundControl.max = 10, soundControl.value = soundControl.max
}), ymaps.ready(init);

var placemarks = [
    {
        latitude: 59.97,
        longitude: 30.31,
        hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
        balloonContent: [
            '<div class="map__balloon">',
            '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
            'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19',
            '</div>'
        ]
    },
    {
        latitude: 59.94,
        longitude: 30.25,
        hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
        balloonContent: [
            '<div class="map__balloon">',
            '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
            'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д 64',
            '</div>'
        ]
    },
    {
        latitude: 59.93,
        longitude: 30.34,
        hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
        balloonContent: [
            '<div class="map__balloon">',
            '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
            'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д. 56',
            '</div>'
        ]
    }
],
    geoObjects= [];

function init() {
    var map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    for (var i = 0; i < placemarks.length; i++) {
            geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
            {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent.join('')
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'img/sprite.png',
                iconImageSize: [46, 57],
                iconImageOffset: [-23, -57],
                iconImageClipRect: [[415, 0], [461, 57]]
            });
    }

    var clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: 'img/burger.png',
                size: [100, 100],
                offset: [-50, -50]
            }
        ],
        clusterIconContentLayout: null
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
}