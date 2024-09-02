export const SET_BREAK_LENGTH = 'SET_BREAK_LENGTH';
export const SET_SESSION_LENGTH = 'SET_SESSION_LENGTH';
export const START_TIMER = 'START_TIMER';
export const DECREMENT_TIME_LEFT = 'DECREMENT_TIME_LEFT';
export const SWITCH_TIMER = 'SWITCH_TIMER';
export const RESET_TIMER = 'RESET_TIMER';

export const setBreakLength = (length) => ({
  type: SET_BREAK_LENGTH,
  payload: length,
});

export const setSessionLength = (length) => ({
  type: SET_SESSION_LENGTH,
  payload: length,
});

export const startTimer = () => ({
  type: START_TIMER,
});

export const decrementTimeLeft = () => ({
  type: DECREMENT_TIME_LEFT,
});

export const switchTimer = () => ({
  type: SWITCH_TIMER,
});

export const resetTimer = () => ({
  type: RESET_TIMER,
});
