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
            beepAudio.play().catch(error => console.error('Error playing audio:', error));
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
      const newBreakLength = Math.min(60, Math.max(1, breakLength + amount));
      dispatch(setBreakLength(newBreakLength));
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
    const beepAudio = document.getElementById('beep');
    if (beepAudio) {
      beepAudio.pause();
      beepAudio.currentTime = 0;  // Reset audio to the start
    }
    dispatch(resetTimer());
  };

  const formatTime = (timeInSeconds) => {
    const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, '0');
    const seconds = String(timeInSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200">
      <div className="text-4xl font-extrabold text-gray-800 mb-8">Pomodoro Clock</div>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-12 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div id="break-label" className="text-2xl font-semibold text-gray-700 mb-4">Break Length</div>
          <div className="flex items-center justify-center space-x-4">
            <button id="break-decrement" onClick={() => handleBreakChange(-1)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">-</button>
            <span id="break-length" className="text-3xl font-bold text-gray-900">{breakLength}</span>
            <button id="break-increment" onClick={() => handleBreakChange(1)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">+</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div id="session-label" className="text-2xl font-semibold text-gray-700 mb-4">Session Length</div>
          <div className="flex items-center justify-center space-x-4">
            <button id="session-decrement" onClick={() => handleSessionChange(-1)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">-</button>
            <span id="session-length" className="text-3xl font-bold text-gray-900">{sessionLength}</span>
            <button id="session-increment" onClick={() => handleSessionChange(1)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">+</button>
          </div>
        </div>
      </div>

      <div id="timer-label" className="bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="text-3xl font-semibold text-gray-700 mb-4">{currentTimer}</div>
        <span id="time-left" className="text-6xl font-bold text-gray-900">{formatTime(timeLeft)}</span>
      </div>

      <div className="flex space-x-6 mt-8">
        <button id="start_stop" onClick={handleStartStop} className="bg-teal-200 text-teal-800 px-6 py-3 rounded-md hover:bg-teal-300">
          {timerRunning ? 'Pause' : 'Start'}
        </button>
        <button id="reset" onClick={handleReset} className="bg-pink-200 text-pink-800 px-6 py-3 rounded-md hover:bg-pink-300">Reset</button>
      </div>

      <audio id="beep" src={beepSound} preload="auto" />
    </div>
  );
};

export default Clock;
