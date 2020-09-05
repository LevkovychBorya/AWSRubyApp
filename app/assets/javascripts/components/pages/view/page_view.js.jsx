var PageView = React.createClass({
  getInitialState: function() {
    return {page: []};
  },

  componentDidMount: function() {
    (new Bb.Models.Page({id: this.props.params.pageId})).fetch({
      success: function(model) {
        this.setState({page: model.toJSON()});
      }.bind(this)
    });
  },

  componentWillReceiveProps: function(nextProps) {
    (new Bb.Models.Page({id: nextProps.params.pageId})).fetch({
      success: function(model) {
        this.setState({page: model.toJSON()});
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="container-fluid pages_container">
        <p dangerouslySetInnerHTML={{__html: this.state.page.body}} />
      </div>
    );
  }
});
