import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        rejected({ position, delay });
      }
    }, delay);
  });
}

function onSubmitForm(evt) {
  evt.preventDefault();

  let firstDelay = Number(formEl['delay'].value);
  const delayStep = Number(formEl['step'].value);
  const amount = Number(formEl['amount'].value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += delayStep;
  }
  evt.currentTarget.reset();
}

formEl.addEventListener('submit', onSubmitForm);