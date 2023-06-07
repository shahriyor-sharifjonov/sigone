import * as functions from "./modules/functions.js";
import * as bootstrap from "bootstrap";

functions.isWebp();

import imagesLoaded from "imagesloaded";

import SmoothScroll from "smoothscroll-for-websites";
import Swiper, { Navigation, Pagination, EffectCoverflow } from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import { CSSRulePlugin } from "gsap/CSSRulePlugin.js";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CSSRulePlugin);

const images = document.querySelectorAll("img");
// const loader = document.querySelector("#preloader__num");
const updateProgress = (instance) => {
  const prc = Math.round((instance.progressedCount * 100) / images.length);
//   loader.innerHTML = prc + "%";
};

if(document.querySelector('.footer__anchore')){
  const a = document.querySelector('.footer__anchore');
  const cs = document.querySelectorAll('.leave__link a');
  a.addEventListener('click', e => {
    setTimeout(() => {
      a.setAttribute('href', '#banner')
    }, 1000)
  })
  cs.forEach(c => {
    c.addEventListener('click', () => {
      a.setAttribute('href', '#leave')
    })
  })
}

window.addEventListener('scroll', function() {
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollPosition > window.innerHeight / 3) {
    var element = document.querySelector('.footer__anchore');
    element.classList.add('show');
  } else {
    var element = document.querySelector('.footer__anchore');
    element.classList.remove('show');
  }
});

const headerButton = document.querySelectorAll(".header__btn");
const headerMenu = document.querySelector(".header__menu");
let menuOpened = false;
const menuToggle = () => {
  menuOpened = !menuOpened;
  headerButton.forEach(btn => {
    btn.classList.toggle("open");
  })
  headerMenu.classList.toggle("open");
};

headerButton.forEach(btn => {
  btn.onclick = menuToggle;
})

window.onclick = (e) => {
  if (
    menuOpened && (
      headerButton.forEach(btn => {
        !e.composedPath().includes(btn)
      })
    ) && !e.composedPath().includes(headerMenu)
  )
    menuToggle();
};

if (document.querySelector('.remove-picture')) {
  var element = document.querySelector('.remove-picture');
  
  // Find the <picture> tag within the element
  var pictureTag = element.querySelector('picture');
  
  // Get the parent element of <picture>
  var parent = pictureTag.parentNode;

  // Replace the <picture> tag with the <img> tag
  parent.replaceChild(element.querySelector('img'), pictureTag);
}

const showDemo = () => {
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 1000);
  // Scroller
  (function scroller() {
    SmoothScroll({
      animationTime: 500,
      stepSize: 80,
      keyboardSupport: true,
      arrowScroll: 1000,
      touchpadSupport: true,
    });
  })();

  (function gsapMatchMedia() {
    let matchMedia = gsap.matchMedia();

    const tlMenu = gsap.timeline({ paused: true });

    const btnToggler = document.querySelector(".header__item a");
    btnToggler.addEventListener("click", toggleMenu);
    function toggleMenu() {
      tlMenu.reversed()
        ? tlMenu.timeScale(1).play()
        : tlMenu.timeScale(2).reverse();
      btnToggler.classList.toggle("open");
    }
    tlMenu.reverse();

    gsap.from(".decoration", {
      y: 150,
      duration: 1,
      scrollTrigger: {
        trigger: ".decoration",
        scrub: true,
      },
    });

    // var bannerDeskriptionAfter = CSSRulePlugin.getRule(
    //   ".promo-progress__list:after"
    // );
    // const tlBannerDeskription = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".promo-progress",
    //     start: "top 60%",
    //   },
    // });
    // tlBannerDeskription.to(bannerDeskriptionAfter, {
    //   duration: 2,
    //   ease: "sine.out",
    //   cssRule: { xPercent: 100 },
    // });

    const percentWayItem = gsap.utils.toArray(".percent-way__item");

    const percentWayActive = gsap.utils.toArray(".percent-way_active");

    const tlPercentWay = gsap.timeline({
      scrollTrigger: {
        trigger: ".percent-way",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    percentWayActive.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        end: "bottom center",

        onEnter: () => {
          percentWayItem.forEach((e) => {
            e.classList.remove("active");
          });
          percentWayItem[i].classList.add("active");
        },
        onEnterBack: () => {
          percentWayItem.forEach((e) => {
            e.classList.remove("active");
          });
          percentWayItem[i].classList.add("active");
        },
      });
    });

    const gsapAbout = gsap.utils.toArray(".approved_item");
    gsapAbout.forEach((about) => {
      gsap.from(about, {
        opacity: 0,
        duration: 2,
        scrollTrigger: {
          trigger: about,
          start: "-=200 50%",
          end: "=300 50%",
          scrub: true,
        },
      });
    });

    matchMedia.add("(min-width: 1200px)", () => {
      gsap.fromTo(
        ".course-banner__button",
        {
          yPercent: -100,
          ease: "none",
          duration: 2,
          scrollTrigger: {
            trigger: ".course-banner__button",
            scrub: true,
          },
        },
        {
          yPercent: 100,
          ease: "none",
          duration: 2,
          scrollTrigger: {
            trigger: ".course-banner__button",
            scrub: true,
          },
        }
      );
    })

    matchMedia.add("(max-width: 1200px)", () => {
      const leaveItem = gsap.utils.toArray(".leave__link");
      const leaveActive = gsap.utils.toArray(".leave__link");
      leaveActive.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
  
          onEnter: () => {
            leaveItem.forEach((e) => {
              e.classList.remove("active");
            });
            leaveItem[i].classList.add("active");
          },
          onEnterBack: () => {
            leaveItem.forEach((e) => {
              e.classList.remove("active");
            });
            leaveItem[i].classList.add("active");
          },
        });
      });
    })

    matchMedia.add("(max-width: 2500px) and (min-width: 993px)", () => {});
  })();

  // Swiper banner
  (function speakersSwipe() {
    document
      .querySelectorAll(".speakers__swiper.swiper")
      .forEach(function (el, index) {
        const swiper = new Swiper(el, {
          modules: [Pagination, EffectCoverflow],
          effect: "coverflow",
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: "auto",
          loop: true,
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 1000,
            modifier: 2,
            slideShadows: true,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      });
  })();

  (function reviewsSwipe() {
    document
      .querySelectorAll(".reviews__swiper.swiper")
      .forEach(function (el, index) {
        const swiper = new Swiper(el, {
          modules: [Pagination, Navigation],
          slidesPerView: 1,
          navigation: {
            nextEl: ".reviews__swiper-button-next",
            prevEl: ".reviews__swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      });
  })();

  (function addClassLeave() {
    document.querySelectorAll(".leave_active").forEach((e) => {
      e.addEventListener("mouseover", function () {
        this.classList.add("active");
      });
      e.addEventListener("mouseout", function () {
        this.classList.remove("active");
      });
    });
  })();

  (function addClassExpectedSkills() {
    let skillsItems = document.querySelectorAll(".expected-skills__item");
    let skillsList = document.querySelector(".expected-skills__list");
    let skillsBtn = document.querySelector(".expected-skills__info-button");
    let skillsBg = document.querySelector(".expected-skills-bg");

    skillsItems.forEach((e) => {
      e.addEventListener("click", () => {
        e.classList.toggle("active");
        skillsList.classList.toggle("active");
        skillsBg.classList.toggle("active");
      });
    });
  })();
};

setTimeout(
  () =>
    imagesLoaded(images).on("progress", updateProgress).on("always", showDemo),
  500
);
