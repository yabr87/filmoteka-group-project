import { refs } from '../refs';

export const renderBtn = authState => {
  let markup = '';
  if (!authState) {
    markup = `            
          <button class="auth-btn" data-type = 'sign-in' type="button">
            Sign in
          </button>`;
  } else {
    markup = `            
          <button class="auth-btn"  data-type = 'log-out' type="button">
            Log out
          </button>`;
  }
  refs.authBtnWrap.innerHTML = '';
  refs.authBtnWrap.insertAdjacentHTML('beforeend', markup);
};
