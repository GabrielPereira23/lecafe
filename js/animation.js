function animation(element, animation, duration, callback = () => {}) {
  element.classList.add(`a-${animation}`);
  setTimeout(() => {
    element.classList.remove(`a-${animation}`);
    callback();
  }, duration);
}