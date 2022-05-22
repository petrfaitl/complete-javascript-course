'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Smooth scrolling

const smoothScroll = function (e) {
    e.preventDefault();
    // console.log(this);

    const target = this.getBoundingClientRect();
    // console.log(target);
    // console.log('Scroll window from top', window.scrollY);

    window.scrollTo({
        left: target.left + target.scrollX,
        top: target.top + window.scrollY,
        behavior: "smooth"
    });

}
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const navLinks = [...document.querySelectorAll('.nav__link')].slice(0, 3);
// console.log(navLinks);
// const section1 = document.querySelector('#section--1');
// const section2 = document.querySelector('#section--2');
// const section3 = document.querySelector('#section--3');
// const sections = [section1, section2, section3];
// for (const [pos, navLink] of navLinks.entries()) {
//     const section = document.querySelector(`#section--${pos + 1}`);
//     console.log(section);
//     navLink.addEventListener('click', smoothScroll.bind(section));
//
// }
// btnScrollTo.addEventListener('click', smoothScroll.bind(section1));

// Event delegation; we're taking an advantage of event bubbling
// 1. Add event listener to common parent element
// 2. Determine which event created the event

const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener('click', function (e) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    if (e.target.classList.contains('nav__link') && !e.target.classList.contains('btn--show-modal')) {
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

// Fade out other nav links
const navHover = function (e) {
    const links = e.currentTarget.querySelectorAll('.nav__link');

    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        links.forEach(el => {
            if (el !== link) {
                el.style.opacity = this;
            }
        })
    }
}

navLinks.addEventListener('mouseover', navHover.bind(0.5));
navLinks.addEventListener('mouseout', navHover.bind(1));

// Implementing a cookie message
const header = document.querySelector('.header');

// commented out as it's annoying
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'We use cookies  to annoy users <button class="btn btn--close-cookie">Close</button>';
// header.before(message);
// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//     message.remove();
// });
// message.style.backgroundColor = '#434343';
// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// Tabbed content
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const tabContent = function (ev) {
    ev.preventDefault();

    // If active  tab > remove active class
    tabs.forEach((t) => {
        t.classList.remove('operations__tab--active');
    });

    const targetButton = ev.target.closest('.operations__tab');
    if (!targetButton) return;

    // if  active  content area; remove active class
    tabsContent.forEach(c => {
        c.classList.remove('operations__content--active');
    })
    if (targetButton) {
        // Get the correct content tab and activate it
        targetButton.classList.add('operations__tab--active');
        const dataId = targetButton.getAttribute('data-tab');
        const targetTab = document.querySelector(`.operations__content--${dataId}`);
        targetTab.classList.add('operations__content--active');
    }
}
tabsContainer.addEventListener('click', tabContent);

const section1 = document.querySelector('#section--1');
const initialCoords = section1.getBoundingClientRect();

const nav = document.querySelector('nav');
const navHeight = nav.getBoundingClientRect().height;

// Sticky navigation; not very performant on smartphone due to scroll event firing on any page movement
// window.addEventListener('scroll', function () {
//
//
//     if (window.scrollY > navInitialCoords.bottom) {
//         nav.classList.add('sticky');
//         nav.style.top = '0';
//
//     } else {
//         nav.classList.remove('sticky');
//     }
//
//
// });
const headerTitle = document.querySelector('.header__title');

// Sticky navigation using Intersection Observer API
const stickyNav = function (entries) {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
        nav.style.top = '0';
    } else {
        nav.classList.remove('sticky');
    }
}
const obsOptions = {
    root: null, threshold: 1,

    // rootMargin: `${navHeight}px`
}
// Nav highlight using Intersection Observer
const observer = new IntersectionObserver(stickyNav, obsOptions);
observer.observe(headerTitle);
let activeSection;
const highlightNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    activeSection = entry.target.dataset.navSection;
    if (activeSection) {
        const navLinksA = navLinks.querySelectorAll('.nav__link');
        navLinksA.forEach(link => link.classList.remove('nav__link-active'));
        const targetNav = [...navLinksA].find(link => link.getAttribute('data-nav') === activeSection);
        targetNav?.classList.add('nav__link-active');
    }
}

const obsOptionsNav = {
    root: null, threshold: 0.2,
}

const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry?.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const sections = document.querySelectorAll('section');
const navObserver = new IntersectionObserver(highlightNav, obsOptionsNav);
const revealObserver = new IntersectionObserver(revealSection, {
    root: null, threshold: 0.2
});

sections.forEach(section => {
// Nav highlight on section visible
    navObserver.observe(section);
// Section reveal on approach
//     section.classList.add('section--hidden');
    revealObserver.observe(section);
});

// Lazy Loading images

const lazyLoad = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.setAttribute('src', entry.target.getAttribute('data-src'));

    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    })
    observer.unobserve(entry.target);

}

const imgTargets = document.querySelectorAll('img[data-src]');
const lazyObserver = new IntersectionObserver(lazyLoad, {
    root: null, threshold: 0, rootMargin: '+200px',
});
imgTargets.forEach(target => {
    lazyObserver.observe(target);
})

// Scroll to the top
const logo = document.querySelector('#logo');
logo.addEventListener('click', () => window.scrollTo({
    top: 0, left: 0, behavior: 'smooth'
}));

///////////////////////////////////////////////////////
// Slider
const slider = function (options) {

    const slides = document.querySelectorAll('.slide');
    const sliderBtnRight = document.querySelector('.slider__btn--right');
    const sliderBtnLeft = document.querySelector('.slider__btn--left');
    const dotContainer = document.querySelector('.dots');
    let curSlide = 0;
    const slideCount = slides.length;

    const createDots = function (activeSlide) {
        slides.forEach(function (_, i) {
            const dot = document.createElement("span");
            dot.classList.add('dots__dot');
            dot.setAttribute('data-dot', i);
            dotContainer.insertAdjacentElement('beforeend', dot);
        })
    }
    const setActiveDot = function (slide) {
        const dots = dotContainer.querySelectorAll('.dots__dot');
        dots.forEach((d, i) => {
            d.classList.remove('dots__dot--active');
            if (i === slide) {
                d.classList.add('dots__dot--active');
            }
        })
    }
    const goToSlide = function (slide) {
        slides.forEach((s, i, arr) => {
            s.style.transform = `translateX(${100 * (i - slide)}%)`;

        })
    }

    const nextSlide = function () {
        if (curSlide === slideCount - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }
        goToSlide(curSlide);
        setActiveDot(curSlide);
    }
    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = slideCount - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        setActiveDot(curSlide);
    }
    const init = function () {
        goToSlide(curSlide);
        createDots(curSlide);
        setActiveDot(curSlide);
    }
    init();

// Event handlers
    sliderBtnRight.addEventListener('click', nextSlide);
    sliderBtnLeft.addEventListener('click', prevSlide);
    document.addEventListener('keydown', e => {
        const keyCode = e.key;
        if (keyCode === 'ArrowRight') {
            nextSlide();
        } else if (keyCode === 'ArrowLeft') {
            prevSlide();
        }
    });
    dotContainer.addEventListener('click', function (e) {
        const clicked = Number(e.target.getAttribute('data-dot'));
        setActiveDot(clicked);
        goToSlide(clicked);
    })
};
slider();

// Event Lifecycle
// document.addEventListener('DOMContentLoaded', function (e) {
//     console.log(e);
// });
//
// window.addEventListener('load', function (e) {
//     console.log(e);
// });
// window.onbeforeunload = function (e) {
//     console.log(e);
//     return "Unsaved";
//
// };

///////////////////////////////////////
// Selecting Elements

// // console.log(document.documentElement);
// // console.log(document.header);
const allSections = document.querySelectorAll(('.section'));
// console.log(allSections);
// console.log(document.getElementById('section--1'));

// Returns HTMLCollection; this is a live variable that's updated when an element is added or removed
// console.log(document.getElementsByTagName('button'));
// console.log(document.getElementsByClassName('btn'));

// Creating and Deleting elements
// .insertAdjecentHTML // one way.
//

// Styles
// message.style.backgroundColor = '#434343';
// message.style.width = '90%';
// console.log(getComputedStyle(message).height);
// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
// console.log(getComputedStyle(message).height);
// const header = document.querySelector('.header');
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookies  to annoy users';
// message.innerHTML = 'We use cookies  to annoy users <button class="btn btn--close-cookie">Close</button>';
// // header.prepend(message);
// // header.append(message);
// header.before(message); //duplicates the node
// // header.after(message.cloneNode(true));
//
// // Delete elements
// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//     message.remove();
// })
// setProperty
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.getAttribute('alt'));
// console.log(logo.alt);
// console.log(logo.className);
// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// logo.setAttribute('alt', 'myFirstJob');
// console.log(logo.getAttribute('alt'));
// logo.alt = 'Beautiful logo';
// console.log(logo.alt);

// Be careful with absolute and relative paths
const link = document.querySelector('.btn--show-modal');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// Data attributes
// console.log(logo.dataset.versionNumber);
// console.log(logo.getAttribute('data-version-number'));

// const alertMsg = function (e) {
//     alert('H1 was hovered');
// }
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', alertMsg);
// setTimeout(() => {
//     h1.removeEventListener('mouseenter', alertMsg);
// }, 3000);

const h1 = document.querySelector('h1');
// going  downwards
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild.style.color = 'white');
// console.log(h1.lastElementChild.style.color = 'orangered');
//
// // Going upwards
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// console.log(h1.closest('.header').style.background = 'var(--gradient-secondary)');
//
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
//
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//     if (el != h1) {
//         el.style.transform = 'scale(1.1)';
//     }
// })