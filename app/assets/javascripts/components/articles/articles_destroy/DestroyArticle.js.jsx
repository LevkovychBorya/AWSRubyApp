var DestroyArticle = React.createClass({
  mixins: [ReactRouter.Navigation],

  handleDestroy: function(e) {
    e.preventDefault();
    bootbox.confirm("Are you sure?", function(result) {
      if (result) {
        (new Bb.Models.Article({id: this.props.id})).destroy({
          success: function() {
            this.transitionTo("articles");
          }.bind(this),
          error: function(model, response) {
            console.error(response);
          }
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <form onSubmit={this.handleDestroy} className="col-md-1">
        <div className="form-group">
          <button className="btn btn-danger btn-sm" ref="destroy">
            <span className="glyphicon glyphicon-trash"> Delete</span>
          </button>
        </div>
      </form>
    );
  }
});
