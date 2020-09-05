var EventForm = React.createClass({
  mixins: [ReactRouter.Navigation],
  getInitialState: function () {
    return {
      event: {},
      eventId: this.props.eventId
    };
  },
  getDefaultProps: function() {
    return {
      event: new Bb.Models.Event()
    };
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      eventId: nextProps.eventId
    });
    this.init(nextProps.eventId);
  },
  componentDidMount: function () {
    this.props.event.on('change', function () {
      this.setState({
        event: this.props.event.toJSON()
      });
    }, this);
    this.init(this.state.eventId);
  },
  componentWillUnmount: function () {
    this.props.event.off('change');
  },
  init: function(id) {
    if (id != null) {
      this.props.event.set('id', id);
      this.props.event.fetch();
    }
  },
  handleSubmit: function (event) {
    var self = this;
    event.preventDefault();
    this.props.event.save(this.state.event, {
      success: function(model) {
        self.transitionTo('event', {eventId: model.get('id')});
      }
    });
  },
  handleDestroy: function (event) {
    var self = this;
    event.preventDefault();
    this.props.event.destroy({
      success: function(model) {
        self.transitionTo('events');
      }
    });
  },
  handleChange: function (name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(_.extend(this.state.event, change));
  },
  render: function () {
    var _event = this.state.event;
    var buttons = [];
    buttons.push((<button className="btn btn-default">Save</button>));
    if (this.props.mode === "edit") {
      buttons.push((<button type="button" className="btn btn-danger" onClick={this.handleDestroy}>Destroy</button>));
    }
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.children}
        <FieldEdit name="name" value={_event.name} handler={this.handleChange} />
        <FieldEdit name="description" formatter={Bb.Helpers.editTextFormatter} value={_event.description} handler={this.handleChange} />
        <FieldEdit name="date" value={_event.date} handler={this.handleChange} />
        <FieldEdit name="capacity" formatter={Bb.Helpers.editNumberFormatter} value={_event.capacity} handler={this.handleChange} />
        <FieldEdit name="place" value={_event.place} handler={this.handleChange} />
        {buttons}
      </form>
      );
  }
});
