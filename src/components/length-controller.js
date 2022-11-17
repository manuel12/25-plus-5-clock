const TimeStepLengthController = (props) => {
  return (
    <div className="mb-3 col-md-6">
      <div id={props.idLabel} className="heading-round bg-green">{props.textLabel}</div>
      <div
        id={props.decrementId}
        className="button bg-orange"
        onClick={props.decrementClickHandler}
      >
        Down
      </div>
      <div id={props.timeStepId} className="display-6">
        {props.timeStepLength}
      </div>
      <div
        id={props.incrementId}
        className="button bg-orange"
        onClick={props.incrementClickHandler}
      >
        Up
      </div>
    </div>
  );
};

export default TimeStepLengthController;
