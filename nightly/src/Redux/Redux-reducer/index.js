const { combineReducers }= require('redux');
const { INCREMENT, DECREMENT, RESET } = require('../Redux-actions');

const INITIAL_STATE = {
  count: 0,
  history: [],
};

function handleChange(state, change) {
  const { count, history } = state;
  return {
    count: count + change,
    history: [count + change, ...history],
  };
}

function counter(state = INITIAL_STATE, action) {
  const { count, history } = state;
  switch (action.type) {
    case INCREMENT:
      return handleChange(state, 1);
    case DECREMENT:
      return handleChange(state, -1);
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
}
const reducers = combineReducers({
  counter,
});

module.exports = reducers;
