export const setBreakLength = (length) => ({
    type: 'SET_BREAK_LENGTH',
    payload: length,
  });
  
  export const setSessionLength = (length) => ({
    type: 'SET_SESSION_LENGTH',
    payload: length,
  });
  
  export const startTimer = () => ({
    type: 'START_TIMER',
  });
  
  export const resetTimer = () => ({
    type: 'RESET_TIMER',
  });
  