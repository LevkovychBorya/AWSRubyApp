var ArticleStatus = React.createClass({
  getInitialState: function() {
    return {status: this.props.status ? this.rewordStatus(this.props.status) : ''};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({status: this.rewordStatus(nextProps.status)});
  },

  rewordStatus: function(status) {
    return status == 'shared' ? 'Public' : 'Private';
  },

  render: function() {
    var classes = 'label';
    classes += (/private/i).test(this.state.status)
      ? ' label-danger'
      : ' label-default';
    return (
      <span className={classes}>
        {this.state.status}
      </span>
    );
  }
})
