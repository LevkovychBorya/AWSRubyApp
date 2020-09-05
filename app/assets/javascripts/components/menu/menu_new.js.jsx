var NewMenu = React.createClass({
mixins: [ReactRouter.Navigation],
 
handleSubmit: function(menu) {
  (new Bb.Models.Menu({menu})).save({}, {
    success: function(model, response) {
    this.transitionTo("menus");
 }.bind(this),
    error: function(model, response) {
    console.error(response);
   }
 });
},

 render: function() {
   return (
     <div>
      <Link to='menus' className="h3">
      {'Back to menus'}
      </Link>
       <h2>New Menu item</h2>
       <MenuForm handleSubmit={this.handleSubmit} />
 </div>
   );
  }
});
