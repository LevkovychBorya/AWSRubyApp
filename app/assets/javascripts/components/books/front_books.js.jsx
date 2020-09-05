
var BooksFront = React.createClass({
  getInitialState: function () {
    return {
      books: []
    };
  },
  componentDidMount: function () {
    this._books = new Bb.Collections.Books;
    this._books.on('update', function () {
      this.setState({books: this._books.toJSON()});
    }, this);
    this._books.fetch();
  },
  componentWillUnmount: function () {
    this._books.off('update');
  },
  render: function () {
    var booksList = this.state.books.map(function (book) {
      return (<Link to={'/books/' + book.id} className="list-group-item" key={book.id}>
        <h4 className="list-group-item-heading">{book.title}</h4>
        </Link>);
    });
    return (
      <div>
        <div className="list-group">{booksList}</div>
      </div>
      );
  }
});
