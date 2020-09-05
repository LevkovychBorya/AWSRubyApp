var ControlPanel = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <i className="glyphicon glyphicon-dashboard"></i>
          <span> Control panel</span>
        </div>
        <div className="panel-body">
          <div className="list-group">
            <a className="list-group-item" href="#man_user">
              <i className="glyphicon glyphicon-user"></i>
              <span> Users</span>
            </a>
            <a className="list-group-item" href="#man_pages">
              <i className="glyphicon glyphicon-paperclip"></i>
              <span> Pages</span>
            </a>
            <a className="list-group-item" href="#man_articles">
              <i className="glyphicon glyphicon-education"></i>
              <span> Articles</span>
            </a>
            <a className="list-group-item" href="#man_books">
              <i className="glyphicon glyphicon-book"></i>
              <span> Books</span>
            </a>
            <a className="list-group-item" href="#man_albums">
              <i className="glyphicon glyphicon-star"></i>
              <span> Albums</span>
            </a>
            <a className="list-group-item" href="#man_menu">
              <i className="glyphicon glyphicon-edit"></i>
              <span> Menu</span>
            </a>
          </div>
        </div>
      </div>  
    );
  }
});
