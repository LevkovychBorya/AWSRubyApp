var EditArticleLink = React.createClass({
  render: function() {
    return (
      <Link
        to="edit_article"
        className="btn btn-danger btn-sm col-md-1"
        {...this.props}>
        <span className="glyphicon glyphicon-pencil"> Edit</span>
      </Link>
    );
  }
});
