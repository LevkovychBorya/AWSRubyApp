var BookEdit = React.createClass({
  mixins: [ReactRouter.Navigation],

  getInitialState: function() {
    return {book: {}};
  },

  componentDidMount: function() {
    var id = this.props.params.bookId,
    book = new Bb.Models.Book({id: id});
    book.fetch({
      success: function(model) {
        this.setState({
          book: model.toJSON(),
          model: model
        });
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      }
    });
  },

  handleSubmit: function(book) {
    this.state.model.save({book}, {
      patch: true,
      success: function() {
        this.transitionTo("book", {bookId: this.state.book.id});
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      }
    });
  },

  render: function() {
    return (
      <div>
        <BackToBooks />
        <h1>Edit Book</h1>
        <BookFormEdit
          book={this.state.book}
          handleSubmit={this.handleSubmit} buttonRole='Edit book'/>
      </div>
    );
  }
});

var BookFormEdit = React.createClass({
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
    var title = React.findDOMNode(this.refs.title).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();
    var attachment = React.findDOMNode(this.refs.attachment).value.trim();
    var book = {title: title, description: description, attachment: attachment};
    if (!title || !description) {
      return;
    }
    this.props.handleSubmit(book);
    return;
  },
   render: function() {
    return (
      <form role="form" onSubmit={this.handleFormSubmit} >
        <div className="col-md-6">
          <div className="form-group">
            <label for="title">Title</label>
            <input type="string"  className="form-control" placeholder="Enter title" ref="title" />
          </div>
          <div className="form-group">
            <label for="title">Description:</label>
            <textarea type="text"  className="form-control" rows="3" placeholder="Please write the description" ref="description" ></textarea>
          </div>
          <div className="form-group">
            <label for="attachment">Attachment</label>
            <input type="file"  ref="attachment"/>
          </div>
          <button type="submit"  className="btn btn-primary">{this.props.buttonRole}</button>
        </div>
      </form>
    );
  }
});
