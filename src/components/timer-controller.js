const TimerController = (props) => {
  return (
    <div className="timer-controls row">
      <div
        id="start_stop"
        className="button col-md-4"
        onClick={props.startStopClickHandler}
      >
        Play/Stop
      </div>
      <div id="reset" className="button col-md-4" onClick={props.resetClickHandler}>
        Reset
      </div>
    </div>
  );
};

export default TimerController;
