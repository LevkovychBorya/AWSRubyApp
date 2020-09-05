var Event = React.createClass({
  mixins: [ReactRouter.Navigation],
  getInitialState: function () {
    return {
      event: {}
    };
  },
  componentDidMount: function () {
    this._event = new Bb.Models.Event({id: this.props.params.eventId});
    this._event.on('change', function () {
      this.setState({
        event: this._event.toJSON()
      });
    }, this);
    this.init();
  },
  componentWillUnmount: function () {
    this._event.off('change');
  },
  componentWillReceiveProps: function (nextProps) {
    this._event.set('id', nextProps.params.eventId);
    this.init();
  },
  init: function() {
    this._event.fetch();
  },
  handleEdit: function (event) {
    event.preventDefault();
    this.transitionTo('eventEdit', {eventId: this._event.get('id')});
  },
  render: function () {
    return (
      <div>
        <h2>Event details</h2>
        <FieldView label="Name" value={this.state.event.name} />
        <FieldView label="Description" value={this.state.event.description} />
        <FieldView label="Date" value={this.state.event.date} formatter={Bb.Helpers.dateFormatter} />
        <FieldView label="Capacity" value={this.state.event.capacity} unit="people" />
        <FieldView label="Place" value={this.state.event.place} />
        <FieldView label="Location" value={[this.state.event.latitude, this.state.event.longitude]} formatter={Bb.Helpers.mapFormatter} />
        <button type="button" className="btn btn-default" onClick={this.handleEdit}>Edit</button>
      </div>
      );
  }
});
