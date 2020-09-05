var ArticleItem = React.createClass({
  render: function() {
    return (
      <div>
        <Link
          to="article"
          params={{articleId: this.props.id}}
          className="h2">
          {this.props.title}
        </Link>
        <br />
        <ArticleStatus status={this.props.status} />
        <p dangerouslySetInnerHTML={{__html: this.props.body}} />
      </div>
    );
  }
});

