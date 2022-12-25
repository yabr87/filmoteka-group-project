import { refs } from '../refs';

export function deactivateTrendsBtn() {
  let activeBtn = [...refs.trendsBtns].find(btn =>
    btn.classList.contains('active-genre')
  );

  if (activeBtn) {
    activeBtn.classList.remove('active-genre');
  }
}