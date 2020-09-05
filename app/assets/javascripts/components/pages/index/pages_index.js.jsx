var Pages = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    (new Bb.Collections.Pages()).fetch({
      success: function(collection) {
        this.setState({data: collection.toJSON()});
      }.bind(this),
      error: function(collection, response) {
        console.error(response);
      }
    });
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="h3 col-md-11">Pages:</div>
          <NewPageLink/>
        </div>
        <PagesList data={this.state.data} />
      </div>
    );
  }
});
