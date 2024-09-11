import { SET_BREAK_LENGTH, SET_SESSION_LENGTH, START_TIMER, RESET_TIMER, DECREMENT_TIME_LEFT, SWITCH_TIMER, UPDATE_TIME_LEFT } from './actions';

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timerRunning: false,
  timeLeft: 1500,
  currentTimer: 'Session'
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BREAK_LENGTH:
      return { ...state, breakLength: action.payload };
    case SET_SESSION_LENGTH:
      return { ...state, sessionLength: action.payload };
    case START_TIMER:
      return { ...state, timerRunning: !state.timerRunning };
    case RESET_TIMER:
      return {
        ...state,
        breakLength: 5,
        sessionLength: 25,
        timeLeft: 25 * 60,
        timerRunning: false,
        currentTimer: 'Session',
      };      
    case DECREMENT_TIME_LEFT:
      return { ...state, timeLeft: state.timeLeft - 1 };
    case SWITCH_TIMER:
      const newTimer = state.currentTimer === 'Session' ? 'Break' : 'Session';
      const newTimeLeft = newTimer === 'Session' ? state.sessionLength * 60 : state.breakLength * 60;
      return {
        ...state,
        currentTimer: newTimer,
        timeLeft: newTimeLeft,
      }          
    case UPDATE_TIME_LEFT:
      return { ...state, timeLeft: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
