import { useState } from "react";
import TimeStepLengthController from "./components/length-controller";
import TimerController from "./components/timer-controller";

import "./App.css";

const DEFAULT_BREAK_LENGTH = 5;
const DEFAULT_SESSION_LENGTH = 25;

const convertTimerToMinutesAndSeconds = (timer) => {
  let minutes = parseInt(timer / 60, 10);
  let seconds = parseInt(timer % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  const minutesAndSeconds = `${minutes}:${seconds}`;
  return minutesAndSeconds;
};

const convertTimerToSeconds = (timer) => {
  let timerString = String(timer);
  if (!timerString.includes(":")) {
    return parseInt(timerString * 60);
  } else {
    const [minutes, seconds] = timerString.split(":");
    return parseInt(minutes * 60) + parseInt(seconds);
  }
};

let intervalID = "";

function App() {
  const [breakLength, setBreakLength] = useState(DEFAULT_BREAK_LENGTH);
  const [sessionLength, setSessionLength] = useState(DEFAULT_SESSION_LENGTH);

  const [timerLabel, setTimerLabel] = useState(true);
  const getTimerLabel = () => {
    return timerLabel;
  };
  const [timer, setTimer] = useState(
    convertTimerToMinutesAndSeconds(sessionLength * 60)
  );

  const [timerRunning, setTimerRunning] = useState(false);
  const [timerStartingForFirstTime, setTimerStartingForFirstTime] =
    useState(true);

  const [timerInterval, setTimerInterval] = useState(null);
  const [sessionNext, setSessionNext] = useState(false);

  const [beep] = useState(document.getElementById("beep"));

  const incrementDecrementHelper = (
    lengthType,
    increase = true,
    setLengthFunc,
    setTimer = null
  ) => {
    const currentLength = lengthType;
    const updatedLength = increase ? currentLength + 1 : currentLength - 1;
    if (updatedLength > 0 && updatedLength < 61) {
      setLengthFunc(updatedLength);
      setTimer && setTimer(convertTimerToMinutesAndSeconds(updatedLength * 60));
    }
  };

  const breakDecrementClickHandler = () => {
    incrementDecrementHelper(breakLength, false, setBreakLength);
    console.log(timerLabel);
  };

  const breakIncrementClickHandler = () => {
    incrementDecrementHelper(breakLength, true, setBreakLength);
  };

  const sessionDecrementClickHandler = () => {
    incrementDecrementHelper(sessionLength, false, setSessionLength, setTimer);
  };

  const sessionIncrementClickHandler = () => {
    incrementDecrementHelper(sessionLength, true, setSessionLength, setTimer);
  };

  const startActions = () => {
    if (timerStartingForFirstTime) {
      setTimerStartingForFirstTime(false);
      startTimer(sessionLength * 60, timerLabel);
    } else {
      console.log(`Continuing with timer on: ${timer} ${typeof timer}`);
      continueTimer(timer);
    }
  };

  const stopActions = () => {
    stopTimer();
    console.log(`Stopped timer on: ${timer} ${typeof timer}`);
  };

  const startStopClickHandler = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      startActions();
    } else {
      setTimerRunning(false);
      stopActions();
    }
  };

  const resetClickHandler = () => {
    setBreakLength(DEFAULT_BREAK_LENGTH);
    setSessionLength(DEFAULT_SESSION_LENGTH);

    setTimerLabel(true);
    setTimer(convertTimerToMinutesAndSeconds(DEFAULT_SESSION_LENGTH * 60));

    setTimerRunning(false);
    setSessionNext(false);

    clearInterval(intervalID);
    stopBeep();
  };

  const timerFinished = (timerLabel) => {
    playBeep();
    clearInterval(intervalID);
    setTimerInterval(null);

    if (timerLabel) {
      setTimer(convertTimerToMinutesAndSeconds(breakLength * 60));
      startTimer(breakLength * 60, !timerLabel);
      console.log(`Started new Break timer`);
    } else {
      setTimer(convertTimerToMinutesAndSeconds(sessionLength * 60));
      startTimer(sessionLength * 60, !timerLabel);
      console.log(`Started new Session timer`);
    }
  };

  const createInterval = (timer, timerLabel) => {
    return setInterval(function () {
      if (--timer < 0) {
        timer = 0;
        timerFinished(timerLabel);
        setTimerLabel(!timerLabel);
      } else {
        console.log(`timer: ${timer} - timerLabel: ${timerLabel}`);
        setTimer(convertTimerToMinutesAndSeconds(timer));
      }
    }, 1000);
  };

  const startTimer = (duration, timerLabel) => {
    let timer = duration;
    intervalID = createInterval(timer, timerLabel);
  };

  const continueTimer = (duration) => {
    let timer = convertTimerToSeconds(duration);
    intervalID = createInterval(timer, timerLabel);
  };

  const stopTimer = () => {
    clearInterval(intervalID);
    setTimerInterval(null);
  };

  const playBeep = () => {
    const audio = document.getElementById("beep");
    audio.play();
  };

  const stopBeep = () => {
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <div className="App">
      <div className="container container-styles">
        <div className="title heading-styles">
          <h1>25 + 5 clock</h1>
        </div>
        <div className="row">
          <TimeStepLengthController
            textLabel="Break Length"
            idLabel="break-label"
            decrementId="break-decrement"
            decrementClickHandler={breakDecrementClickHandler}
            incrementId="break-increment"
            incrementClickHandler={breakIncrementClickHandler}
            timeStepId="break-length"
            timeStepLength={breakLength}
          />

          <TimeStepLengthController
            textLabel="Session Length"
            idLabel="session-label"
            decrementId="session-decrement"
            decrementClickHandler={sessionDecrementClickHandler}
            incrementId="session-increment"
            incrementClickHandler={sessionIncrementClickHandler}
            timeStepId="session-length"
            timeStepLength={sessionLength}
          />
        </div>

        <div className="timer row">
          <div id="timer-label" className="display-6 w-50 m-auto heading-styles heading-bg">
            {timerLabel ? "Session" : "Break"}
          </div>
          <div id="time-left" className="display-1">
            {timer}
          </div>
        </div>
        <TimerController
          startStopClickHandler={startStopClickHandler}
          resetClickHandler={resetClickHandler}
        />

        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    </div>
  );
}

export default App;
