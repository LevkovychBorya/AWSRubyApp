var EditMenu = React.createClass({
  mixins: [ReactRouter.Navigation],

  getInitialState: function() {
   return {menu: {}};
  },

  componentDidMount: function() {
    var id = this.props.params.menuId;
   (new Bb.Models.Menu({id: id})).fetch({
     success: function(model) {
       this.setState({
         menu: model.toJSON(),
         model: model
      });
   }.bind(this),
     error: function(model, response) {
    console.error(response);
 }
 });
 },

  handleSubmit: function(menu) {
   this.state.model.save({menu}, {
   patch: true,
   success: function() {
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
      <h2>Edit Menu</h2>
       <MenuForm
        handleSubmit={this.handleSubmit}
        id={this.props.params.menuId}/>
     </div>
     );
    }
   });
