 const INCREMENT = 'INCREMENT';
 const DECREMENT = 'DECREMENT';
 const RESET = 'RESET';

 function increaseCount() {
  return { type: INCREMENT };
}

 function decreaseCount() {
  return { type: DECREMENT };
}

 function resetCount() {
  return { type: RESET };
}

module.exports = {
  increaseCount,
  decreaseCount,
  resetCount,
  INCREMENT,
  DECREMENT,
  RESET
};