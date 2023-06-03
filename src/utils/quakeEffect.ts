import { QUAKE_EFFECT_CLASS } from '@Omniapp/resources/constants';

export const quakeEffect = (element: HTMLElement, focus = true) => {
  if (element.classList.contains(QUAKE_EFFECT_CLASS)) element.classList.remove(QUAKE_EFFECT_CLASS);
  if (focus) element.focus();
  element.classList.add(QUAKE_EFFECT_CLASS);
  setTimeout(() => element.classList.remove(QUAKE_EFFECT_CLASS), 300);
};
