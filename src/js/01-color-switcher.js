const refs = {
    bodyEl: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
  };
  let timerId = null;
  refs.stopBtn.disabled = true;
  
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  function onStartBtnClick() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    timerId = setInterval(() => {
      let randomColor = getRandomHexColor();
      refs.bodyEl.style.backgroundColor = randomColor;
    }, 1000);
  }
  
  function onStopBtnClick() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    clearInterval(timerId);
  }
  refs.startBtn.addEventListener('click', onStartBtnClick);
  refs.stopBtn.addEventListener('click', onStopBtnClick);