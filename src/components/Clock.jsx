import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBreakLength, setSessionLength, startTimer, resetTimer } from '../redux/actions';

const Clock = () => {
  const dispatch = useDispatch();
  const breakLength = useSelector(state => state.breakLength);
  const sessionLength = useSelector(state => state.sessionLength);
  const timerRunning = useSelector(state => state.timerRunning);
  const timeLeft = useSelector(state => state.timeLeft);
  const currentTimer = useSelector(state => state.currentTimer);

  const handleBreakChange = (amount) => {
    dispatch(setBreakLength(Math.max(1, breakLength + amount)));
  };

  const handleSessionChange = (amount) => {
    dispatch(setSessionLength(Math.max(1, sessionLength + amount)));
  };

  const handleStartStop = () => {
    dispatch(startTimer());
  };

  const handleReset = () => {
    dispatch(resetTimer());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-3xl font-bold mb-6">25 + 5 Clock</div>

      <div className="flex space-x-6 mb-6">
        <div>
          <div id="break-label" className="text-xl">Break Length</div>
          <button id="break-decrement" onClick={() => handleBreakChange(-1)}>-</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={() => handleBreakChange(1)}>+</button>
        </div>

        <div>
          <div id="session-label" className="text-xl">Session Length</div>
          <button id="session-decrement" onClick={() => handleSessionChange(-1)}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={() => handleSessionChange(1)}>+</button>
        </div>
      </div>

      <div id="timer-label" className="text-4xl mb-6">
        {currentTimer}: <span id="time-left">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
      </div>

      <div className="flex space-x-6">
        <button id="start_stop" onClick={handleStartStop} className="bg-blue-500 text-white px-4 py-2 rounded">
          {timerRunning ? 'Pause' : 'Start'}
        </button>
        <button id="reset" onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded">Reset</button>
      </div>
    </div>
  );
};

export default Clock;
