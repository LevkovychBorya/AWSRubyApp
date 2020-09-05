var ToDestroyBook = React.createClass({
  mixins: [ReactRouter.Navigation],

  handleSubmit: function(e) {
    e.preventDefault();
    var book = new Bb.Models.Book({id: this.props.id});
    book.destroy({
      success: function() {
        this.transitionTo("books");
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      },
    });
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} >
        <div className="form-group">
          <button className="btn btn-danger col-md-2" ref="destroy">Delete</button>
        </div>
      </form>
    );
  }
});
