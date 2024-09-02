const initialState = {
    breakLength: 5,
    sessionLength: 25,
    timerRunning: false,
    timeLeft: 1500,
    currentTimer: 'Session',
  };
  
  const clockReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_BREAK_LENGTH':
        return { ...state, breakLength: action.payload };
      case 'SET_SESSION_LENGTH':
        return { ...state, sessionLength: action.payload, timeLeft: action.payload * 60 };
      case 'START_TIMER':
        return { ...state, timerRunning: !state.timerRunning };
      case 'RESET_TIMER':
        return { ...initialState };
      default:
        return state;
    }
  };
  
  export default clockReducer;
  