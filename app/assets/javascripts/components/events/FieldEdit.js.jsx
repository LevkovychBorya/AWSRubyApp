var FieldEdit = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.any,
    handler: React.PropTypes.function,
    formatter: React.PropTypes.function,
    params: React.PropTypes.object
  },
  render: function () {
    var label = Bb.Helpers.capitalize(this.props.name);
    if (this.props.formatter) {
      formatted = this.props.formatter(this.props.value,
        this.props.handler.bind(null, this.props.name),
        this.props.params);
    } else {
      formatted = Bb.Helpers.editStringFormatter(this.props.value,
        this.props.handler.bind(null, this.props.name),
        this.props.params);
    }
    return (
      <div className="form-group">
        <label>{label}:</label>
        { formatted }
      </div>
    );
  }
});

