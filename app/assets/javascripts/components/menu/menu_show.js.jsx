var Menu = React.createClass({

 getInitialState: function() {
 return {menu: []};
 },

  componentWillMount: function() {
   var menu = new Bb.Models.Menu({id: this.props.params.menuId});
    menu.fetch({
      success: function(model) {
        this.setState({menu: model.toJSON()});
         }.bind(this),
      error: function(model, xhr) {
         console.error([
         xhr.status,
         xhr.statusText,
         ": Error while fetching menu from server"
         ].join(" "));
 }
 });
 },

render: function() {
 return (
<div className="container-fluid">
 <div className="row">
    <Link to='menus' className="h4 col-md-10">
       {'Back to menus'}
    </Link>

 </div>

    <h3>Menu item</h3>
    <ul>
      <li>id = {this.state.menu.id}</li>
      <li>name = {this.state.menu.name}</li>
      <li>url = {this.state.menu.url}</li>
    </ul>

    <DestroyMenu id={this.state.menu.id} />
    
  </div>
 );
 }
});
