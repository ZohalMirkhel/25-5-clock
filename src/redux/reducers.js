import {
  SET_BREAK_LENGTH,
  SET_SESSION_LENGTH,
  START_TIMER,
  DECREMENT_TIME_LEFT,
  SWITCH_TIMER,
  RESET_TIMER,
} from './actions';

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timerRunning: false,
  timeLeft: 1500,
  currentTimer: 'Session',
};

const clockReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BREAK_LENGTH:
      return {
        ...state,
        breakLength: Math.min(60, Math.max(1, action.payload)),
      };
    case SET_SESSION_LENGTH:
      return {
        ...state,
        sessionLength: Math.min(60, Math.max(1, action.payload)),
        timeLeft: !state.timerRunning && state.currentTimer === 'Session'
          ? action.payload * 60
          : state.timeLeft,
      };
    case START_TIMER:
      return { ...state, timerRunning: !state.timerRunning };
    case DECREMENT_TIME_LEFT:
      return { ...state, timeLeft: state.timeLeft - 1 };
    case SWITCH_TIMER:
      return state.currentTimer === 'Session'
        ? {
            ...state,
            currentTimer: 'Break',
            timeLeft: state.breakLength * 60,
          }
        : {
            ...state,
            currentTimer: 'Session',
            timeLeft: state.sessionLength * 60,
          };
          case RESET_TIMER:
            return {
              ...state,
              breakLength: 5,
              sessionLength: 25,
              timeLeft: 1500,
              timerRunning: false,
              currentTimer: 'Session',
            };
    default:
      return state;
  }
};

export default clockReducer;
