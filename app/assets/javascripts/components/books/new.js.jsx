var BookNew = React.createClass({
  mixins: [ReactRouter.Navigation],

  handleSubmit: function(book) {
    var newBook = new Bb.Models.Book({book});
    newBook.save({}, {
      success: function(model, response) {
        this.transitionTo("book", {bookId: response.id});
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
        <h2>New Book</h2>
        <BookForm handleSubmit={this.handleSubmit} buttonRole='Create book'/>
      </div>
    );
  }
});
