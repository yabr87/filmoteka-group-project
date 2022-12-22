const scrollToTopBtn = document.querySelector('#scrollToTopBtn');
const rootElement = document.documentElement;

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

scrollToTopBtn.addEventListener('click', scrollToTop);

function scrollEvent() {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('scroll-visible');
    scrollToTopBtn.classList.remove('noHover');
    scrollToTopBtn.classList.remove('clicked');
  } else {
    scrollToTopBtn.classList.remove('scroll-visible');
    scrollToTopBtn.classList.add('noHover');
    scrollToTopBtn.classList.add('clicked');
  }
}

window.addEventListener('scroll', scrollEvent);
