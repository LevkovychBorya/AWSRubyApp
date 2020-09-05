var EventEdit = React.createClass({
  mixins: [ReactRouter.Navigation],
  getInitialState: function () {
    return {
      eventId: this.props.params.eventId
    };
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      eventId: nextProps.params.eventId
    });
  },

  render: function () {
    return (
      <EventForm eventId={this.props.params.eventId} mode="edit">
        <h2>Edit event</h2>
      </EventForm>
    );
  }
});
