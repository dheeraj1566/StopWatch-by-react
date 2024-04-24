import React, { useState, useEffect } from 'react';

function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [runningtime, setrunningtime] = useState(0);

  useEffect(() => {
    let interval;

    if (running && !paused) {
      interval = setInterval(() => {
        const now = Date.now();
        setrunningtime(now - startTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, paused, startTime]);

  const start = () => {
    if (!running) {
      setStartTime(Date.now() - runningtime); 
    }
    setRunning(true);
    setPaused(false);
  };

  const stop = () => {
    setRunning(false);
    setPaused(false);
    setrunningtime(0);
  };

  const pause = () => {
    setPaused(true);
  };

  const resume = () => {
    setPaused(false);
  };

  const TimeFormat = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    const pad = (num) => {
      return num < 10 ? '0' + num : num;
    };

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <div className='timer'>
        <span>{TimeFormat(runningtime)}</span>
      </div>
      <button onClick={start} disabled={running && !paused}>Start</button>
      <button onClick={stop} disabled={!running && !paused}>Stop</button>
      <button onClick={pause} disabled={!running || paused}>Pause</button>
      <button onClick={resume} disabled={!running || !paused}>Continue</button>
    </div>
  );
}

export default Stopwatch;
