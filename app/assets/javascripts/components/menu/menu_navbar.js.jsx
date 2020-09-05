var Navbar = React.createClass({
  getInitialState: function() {
    return {data: []};
 },

  componentDidMount: function() {
    var menus = new Bb.Collections.Menus();
    menus.fetch({
    success: function(collection) {
      this.setState({data: collection.toJSON()});
      }.bind(this),
    error: function(collection, response) {
      console.error(response);
    }
  });
 },

  render: function() {
    var items = this.state.data.map(function(item){
      if (item.submenu.length > 0){
        var submenu = item.submenu.map(function (child) {
        return (
          <li>
            <a href={ child.url }>{ child.name }</a>
          </li>
          );
         });
        return (
          <li className='dropdown'>
            <a href={ item.url } className="dropdown-toggle" data-toggle="dropdown"> { item.name } <span className="caret"></span></a>
            <ul className="dropdown-menu">
            {submenu}
            </ul>
          </li>
        );
      }
      else {
      return (
        <li>
          <a href={ item.url }> { item.name }</a>
        </li>
        );
      }
    });
    return (
    <div>
      <nav className="navbar navbar-fixed-top navbar-default navgreen">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          <a className="navbar-brand" href="#">Language School</a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              {items}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <ul className="nav navbar-nav navbar-right">
              <li><p id="notice">{this.props.notice}</p></li>
              <li><p>{this.props.alert}</p></li>
              {this.props.isSignedIn ? <SignOutLink /> : <SignInLink />}
              {this.props.isSignedIn ? false : <SignUpLink />}
            </ul>
            </ul>
          </div>
        </div>
      </nav>
     </div>
     );
   }
});
