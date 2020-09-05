var AlbumForm = React.createClass({
  getInitialState: function () {
    return {
      album: {}
    };
  },
  handleFormSubmit: function(e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim(),
        description = React.findDOMNode(this.refs.description).value.trim(),
        user_id = React.findDOMNode(this.refs.author).value.trim(),
        album = {title: title, description: description, user_id: 4};
    this.props.handleSubmit({album: album});
  },

   componentWillReceiveProps: function(nextProps) {
    this.setState({album: nextProps.album});
  },
  handleChange: function(e) {
    var newState = this.state.album;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  },
  render: function() {
    return (
      <form role="form" onSubmit={this.handleFormSubmit} >
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="string" id="title" className="form-control" ref="title" value={this.state.album.title} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="title">Description:</label>
            <textarea type="text" id="description" className="form-control" ref="description" value={this.state.album.description} onChange={this.handleChange}  ></textarea>
          </div>
          <div className="form-group" hidden='true'>
            <label htmlFor="user_id">Author</label>
            <input type="number" className="form-control" ref="author"/>
          </div>
          <button type="submit" className="btn btn-default">{this.props.buttonRole}</button>
        </div>
      </form>
    );
  }
});
