import { refs } from './refs';

export function scrollToTop() {
  refs.rootElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

refs.scrollToTopBtn.addEventListener('click', scrollToTop);

export function scrollEvent() {
  if (window.pageYOffset > 300) {
    refs.scrollToTopBtn.classList.add('scroll-visible');
    refs.scrollToTopBtn.classList.remove('noHover');
    refs.scrollToTopBtn.classList.remove('clicked');
  } else {
    refs.scrollToTopBtn.classList.remove('scroll-visible');
    refs.scrollToTopBtn.classList.add('noHover');
    refs.scrollToTopBtn.classList.add('clicked');
  }
}

refs.window.addEventListener('scroll', scrollEvent);
