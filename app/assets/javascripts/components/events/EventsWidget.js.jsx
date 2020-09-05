var EventsWidget = React.createClass({
  getInitialState: function () {
    return {
      events: []
    };
  },
  componentDidMount: function () {
    this._events = new Bb.Collections.Events;
    this._events.on('update', function () {
      this.setState({events: this._events.toJSON()});
    }, this);
    this._events.fetch();
  },
  componentWillUnmount: function () {
    this._events.off('update');
  },
  renderItem: function (event, index) {
    return (
      <Link to={'/events/' + event.id} className="list-group-item" key={index}>
      <small className="glyphicon glyphicon-time"> {Bb.Helpers.dateFormatter(event.date)}</small>
        <div>
          {event.name}
        </div>
      </Link>
    );
  },
  render: function () {
    var count = this.props.count;
    var eventsList = this.state.events.slice(0,count).map(this.renderItem);
    return (
      <div>
        <div className="list-group">{eventsList}</div>
      </div>
    );
  }
});
