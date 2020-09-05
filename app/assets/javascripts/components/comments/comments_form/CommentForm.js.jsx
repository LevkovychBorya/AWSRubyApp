var CommentForm = React.createClass({
  onSubmit: function(e) {
    e.preventDefault();

    var comment = {
      body: React.findDOMNode(this.refs.body).value.trim()
    };

    this.props.handleSubmit(comment);
    React.findDOMNode(this.refs.body).value = "";
  },

  render: function() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="col-md-6" style={{padding: 0}}>
          <input
            ref="body"
            onChange={this.handleChange}
            className="form-control"
            type="text"
            placeholder="Write something..."
            required
          />
        </div>
        <input className="btn btn-primary" type="submit" value="Comment" />
      </form>
    );
  }
});
