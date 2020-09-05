var BackToArticlesLink = React.createClass({
  render: function() {
    return (
      <Link
        to="articles"
        className="h3"
        {...this.props}>
        Back to articles
      </Link>
    );
  }
});
