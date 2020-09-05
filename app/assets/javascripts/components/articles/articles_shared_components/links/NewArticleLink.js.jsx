var NewArticleLink = React.createClass({
  render: function() {
    return (
      <Link
        to="new_article"
        className="btn btn-primary btn-sm col-md-1"
        {...this.props}>
        <span className="glyphicon glyphicon-file"> New</span>
      </Link>
    );
  }
});
