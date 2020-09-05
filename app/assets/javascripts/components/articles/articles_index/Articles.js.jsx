var Articles = React.createClass({
  mixins: [GetCurrentUserId],

  getInitialState: function() {
    return {data: [], current_user_id: ""};
  },

  componentWillMount: function() {
    this.setState({current_user_id: this.getCurrentUserId()});
  },

  componentDidMount: function() {
    var articles = new Bb.Collections.Articles();
    articles.fetch({
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
          <div className="h1 col-md-11">Articles</div>
          {this.state.current_user_id ? <NewArticleLink /> : false}
        </div>
        <ArticlesList data={this.state.data} />
      </div>
    );
  }
});
