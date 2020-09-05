var ArticlesList = React.createClass({
  render: function() {
    var articleNodes = this.props.data.map(function(article, index) {
      return (
        <ArticleItem
          id={article.id}
          title={article.title}
          body={article.body}
          status={article.status}
          key={index}
        />
      );
    });
    return (
      <div>
        {articleNodes}
      </div>
    );
  }
});
