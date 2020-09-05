var EditArticle = React.createClass({
  mixins: [ReactRouter.Navigation],

  getInitialState: function() {
    return {article: {}};
  },

  componentDidMount: function() {
    var id = this.props.params.articleId,
        article = new Bb.Models.Article({id: id});
    article.fetch({
      success: function(model) {
        this.setState({
          article: model.toJSON(),
          model: model
        });
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      }
    });
  },

  handleSubmit: function(article) {
    this.state.model.save({article}, {
      patch: true,
      success: function() {
        this.transitionTo("article", {articleId: this.state.article.id});
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
        <h1>Edit Article</h1>
        <ArticleForm
          article={this.state.article}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
});
