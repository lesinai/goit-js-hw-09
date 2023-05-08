import Notiflix from 'notiflix';
Notiflix.Notify.success('Sol lucet omnibus');



function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
