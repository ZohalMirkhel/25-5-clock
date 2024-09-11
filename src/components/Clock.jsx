import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBreakLength, setSessionLength, startTimer, resetTimer, decrementTimeLeft, switchTimer, updateTimeLeft } from '../redux/actions';
import beepSound from './beep_6.mp3';

const Clock = () => {
  const dispatch = useDispatch();
  const breakLength = useSelector(state => state.breakLength);
  const sessionLength = useSelector(state => state.sessionLength);
  const timerRunning = useSelector(state => state.timerRunning);
  const timeLeft = useSelector(state => state.timeLeft);
  const currentTimer = useSelector(state => state.currentTimer);

  useEffect(() => {
    let interval = null;
  
    if (timerRunning) {
      interval = setInterval(() => {
        if (timeLeft > 0) {
          dispatch(decrementTimeLeft());
        } else if (timeLeft === 0) {
          const beepAudio = document.getElementById('beep');
          if (beepAudio) {
            beepAudio.currentTime = 0;
            beepAudio.play().catch(error => {
              console.error('Error playing audio:', error);
            });
          }
          dispatch(switchTimer());
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
  
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft, dispatch]);  

  const handleBreakChange = (amount) => {
    if (!timerRunning) {
      dispatch(setBreakLength(Math.min(60, Math.max(1, breakLength + amount))));
    }
  };

  const handleSessionChange = (amount) => {
    if (!timerRunning) {
      const newSessionLength = Math.min(60, Math.max(1, sessionLength + amount));
      dispatch(setSessionLength(newSessionLength));
      dispatch(updateTimeLeft(newSessionLength * 60));
    }
  };

  const handleStartStop = () => {
    dispatch(startTimer());
  };

  const handleReset = () => {
    const audio = document.getElementById('beep');
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
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
        {currentTimer}: 
        <span id="time-left">
          {`${Math.floor(timeLeft / 60)}`.padStart(2, '0')}:
          {`${timeLeft % 60}`.padStart(2, '0')}
        </span>
      </div>

      <div className="flex space-x-6">
        <button id="start_stop" onClick={handleStartStop} className="bg-blue-500 text-white px-4 py-2 rounded">
          {timerRunning ? 'Pause' : 'Start'}
        </button>
        <button id="reset" onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded">Reset</button>
      </div>

      <audio id="beep" src={beepSound}></audio>
    </div>
  );
};

export default Clock;
