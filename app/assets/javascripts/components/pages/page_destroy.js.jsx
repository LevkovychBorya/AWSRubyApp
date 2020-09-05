var DestroyPage = React.createClass({
  mixins: [ReactRouter.Navigation],

  handleDestroy: function(e) {
    bootbox.confirm("Are you sure?", function(result) {
      if (result) {
        (new Bb.Models.Page({id: this.props.id})).destroy({
        success: function() {
          this.transitionTo('pages');
        }.bind(this)});
      }
    }.bind(this));
  },

  render: function() {
    return (
      <form onSubmit={this.handleDestroy} className="col-md-1">
        <div className="form-group">
          <button className="btn btn-danger" ref="destroy"> Delete page </button>
        </div>
      </form>
    );
  }
});
