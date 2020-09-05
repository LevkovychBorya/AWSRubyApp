var Events = React.createClass({
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
  render: function () {
    var eventsList = this.state.events.map(function (event, index) {
      return (<Link to={'/events/' + event.id} className="list-group-item" key={index}>{event.name}</Link>);
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div>Events List</div>
            <div className="list-group">{eventsList}</div>
          </div>
        </div>
      </div>
      );
  }
});
