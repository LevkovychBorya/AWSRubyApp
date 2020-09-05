var FieldView = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    unit: React.PropTypes.any,
    value: React.PropTypes.any,
    formatter: React.PropTypes.function
  },
  render: function () {
    if (this.props.value == null) { return null; }

    var formatted = "";
    var unit = this.props.unit || "";

    if (this.props.formatter) {
      formatted = this.props.formatter(this.props.value, this.props.unit);
    } else {
      formatted = this.props.value + " " + unit;
    }

    return (
      <div className="form-group">
        <label>{this.props.label}:</label>
        <div>
          {formatted}
        </div>
        <hr />
      </div>
      );
  }
});
