var DestroyComment = React.createClass({
  mixins: [SetCommentUrl],

  handleSubmit: function(e) {
    e.preventDefault();
    var comment = new Bb.Models.Comment({id: this.props.id});
    comment.urlRoot = this.setCommentUrl();
    comment.destroy({
      success: function() {
         this.props.handleDestroy(this.props.index);
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      },
    });
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}  style={{display: "inline"}}>
        <button className="close">&times;</button>
      </form>
    );
  }
});
