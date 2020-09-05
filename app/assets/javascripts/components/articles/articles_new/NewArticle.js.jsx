var NewArticle = React.createClass({
  mixins: [ReactRouter.Navigation],

  handleSubmit: function(article) {
    var newArticle = new Bb.Models.Article({article});
    newArticle.save({}, {
      success: function(model, response) {
        this.transitionTo("article", {articleId: response.id});
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      }
    });
  },

  render: function() {
    return (
      <div>
        <BackToArticlesLink />
        <h1>New Article</h1>
        <ArticleForm handleSubmit={this.handleSubmit} />
      </div>
    );
  }
});

