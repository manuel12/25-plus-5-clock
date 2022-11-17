const TimerController = (props) => {
  return (
    <div className="timer-controls row">
      <div
        id="start_stop"
        className="col-md-4 button bg-orange"
        onClick={props.startStopClickHandler}
      >
        Play/Stop
      </div>
      <div className="col-md-1">
      </div>
      <div id="reset" className="col-md-4 button bg-orange" onClick={props.resetClickHandler}>
        Reset
      </div>
    </div>
  );
};

export default TimerController;
