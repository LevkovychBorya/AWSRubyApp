var DestroyMenu = React.createClass({
  mixins: [ReactRouter.Navigation],

  
handleSubmit: function(e) {
  e.preventDefault();
  var menu = new Bb.Models.Menu({id: this.props.id});
  menu.destroy({
    success: function() {
    this.transitionTo('menus');}.bind(this),
    error: function(model, response) {
    console.error(response);},
   });
 },

render: function() {
 return (
 <form onSubmit={this.handleSubmit} className="col-md-1">
   <div className="form-group">
     <button className="btn btn-danger" ref="destroy">Delete menu item</button>
 </div>
 </form>
 );
 }
});
