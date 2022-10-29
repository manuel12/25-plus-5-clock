const TimeStepLengthController = (props) => {
  return (
    <div className="mb-3 col-md-6">
      <div id={props.idLabel} className="heading-styles heading-bg">{props.textLabel}</div>
      <div
        id={props.decrementId}
        className="button button-styles"
        onClick={props.decrementClickHandler}
      >
        Down
      </div>
      <div id={props.timeStepId} className="display-6">
        {props.timeStepLength}
      </div>
      <div
        id={props.incrementId}
        className="button button-styles"
        onClick={props.incrementClickHandler}
      >
        Up
      </div>
    </div>
  );
};

export default TimeStepLengthController;
