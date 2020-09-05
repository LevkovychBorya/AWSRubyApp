var Menus = React.createClass({
mixins: [ReactRouter.Navigation],
  
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
  var items = this.state.data.map(function(menu) {
    var submenu = menu.submenu.map(function(child) {  
      return (
      <tr key={child.id} >
        <td>{child.id}</td>
        <td>{child.parent_id}</td>
        <td>{child.name}</td>
        <td>{child.url}</td>
        <td><Link to="menu_item" params={{menuId: child.id}}className="btn btn-danger">{'Delete'}</Link></td>
        <td><Link to="edit" params={{menuId: child.id}}className="btn btn-warning">{'Edit'}</Link></td>
      </tr>
   );
 });

return ( 
  <tbody>
      <tr key={menu.id} >
        <td>{menu.id}</td>
        <td>{menu.parent_id}</td>
        <td>{menu.name}</td>
        <td>{menu.url}</td>
        <td><Link to="menu_item" params={{menuId: menu.id}}className="btn btn-danger">{'Delete'}</Link></td>
        <td><Link to="edit" params={{menuId: menu.id}}className="btn btn-warning">{'Edit'}</Link></td>
      </tr>
      <tr>{submenu}</tr>
  </tbody>     
  );
});
  return (
<div className='menu-wrapper'>
  <h2> List of menu items </h2>
  <table className='table table-striped'> 
    <thead>
      <tr>
        <th>ID</th>
        <th>PID</th>
        <th>Name</th>
        <th>URL</th>
      <th colSpan="4"></th>
    </tr>
  </thead>
{items}
</table>

<Link to='new_menu' className="btn btn-success">
      {'Create new menu item'}
    </Link>
</div>
    );
  }
});
