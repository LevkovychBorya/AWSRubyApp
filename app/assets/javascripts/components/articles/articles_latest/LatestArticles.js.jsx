var LatestArticles = React.createClass({
  getInitialState: function() {
    return {articles: []};
  },

  componentDidMount: function() {
    (new Bb.Collections.Articles({path: "/latest"})).fetch({
      success: function(collection) {
        this.setState({articles: collection.toJSON().map(function(article, index) {
          return (
            <li>
              {/*ugly link making, but router's <Link /> doesn't work due to context issue */}
              <a className="h4"
                 style={{textDecoration:"none"}}
                 href={"#articles/" + article.id}>
                 <span className="glyphicon glyphicon-menu-right" />
                 <span>&nbsp;</span>
                 {article.title}
              </a>
              <span>&nbsp;</span>
              <ArticleStatus status={article.status} />
              <div style={{margin: 10}} />
            </li>
          );
        })});
      }.bind(this),
      error: function(collection, response) {
        console.error(response);
      }
    });
  },

  render: function() {
    return (
      <ul className="list-unstyled">
        {this.state.articles}
      </ul>
    );
  }
});
