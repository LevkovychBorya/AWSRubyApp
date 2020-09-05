var BackToPages = React.createClass({
  render: function() {
    return (
      <Link to="pages" className="link" {...this.props}>
        Back 
      </Link>
    );
  }
});

var EditPageLink = React.createClass({
  render: function() {
    return (
      <Link to="edit_page"
        className="btn btn-danger col-md-1"
        {...this.props}>
        Edit page
      </Link>
    );
  }
});

var NewPageLink = React.createClass({
  render: function() {
    return (
      <Link to="new_page"
        className="btn btn-primary col-md-1"
        {...this.props}>
        New Page
      </Link>
    );
  }
});
