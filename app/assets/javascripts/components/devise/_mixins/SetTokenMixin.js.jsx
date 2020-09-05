var SetTokenMixin = {
  getInitialState: function() {
    return {token: ""};
  },

  componentDidMount: function() {
    this.setState({token: $("meta[name='csrf-token']").attr("content")});
  }
};
