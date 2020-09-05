var BookForm = React.createClass({
  getInitialState: function() {
    return {book: {}};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({book: nextProps.book});
  },

  handleChange: function(e) {
    var newState = this.state.book;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  },

  handleFormSubmit: function(e) {
    e.preventDefault();
    var form = document.forms.namedItem("infoform"),
     MyForm = new FormData(form);
     oReq = new XMLHttpRequest();
    oReq.open("POST", "/api/v1/books", true);
    oReq.send(MyForm);
    this.transitionTo('/books/' + this.props.params.bookId);
  },
  
  render: function() {
    return (
      <form name = "infoform" encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
        <div className="col-md-6">
          <div className="form-group">
            <label for="title">Title</label>
            <input type="string" name = "book[title]" className="form-control" placeholder="Enter title"  />
          </div>
          <div className="form-group">
            <label for="title">Description:</label>
            <textarea type="text" name = "book[description]" className="form-control" rows="3" placeholder="Please write the description"  ></textarea>
          </div>
          <div className="form-group">
            <label for="attachment">Attachment</label>
            <input type="file" name = "book[attachment]" />
          </div>
          <button type="submit"  className="btn btn-primary">{this.props.buttonRole}</button>
        </div>
      </form>
    );
  }
});
